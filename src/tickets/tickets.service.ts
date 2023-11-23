import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SendTicketDto } from './dto/send-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<TicketDocument>, 
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<any> {
    const exists = await this.ticketModel.findOne({code:createTicketDto.code}).exec();
    if(exists){
      return false
    }
    else {
      createTicketDto.status = "VALID";
    return this.ticketModel.create(createTicketDto);
  }}


  async validate(code: number): Promise<any> {
    const ticket = await this.ticketModel.findOne({
      code: code,
      status: "VALID",
    }).exec();
    if (!ticket) {
      return false
    }
    return this.ticketModel.validate(code)
    

  }

  async findAll(): Promise<any> {
    let tickets = this.ticketModel.find().exec();
    let ticketsDTO = (await tickets).map((ticket) => {
      return new SendTicketDto()
      .setCode(ticket.code)
      .setName(ticket.name)
      .setEmail(ticket.email)
      .setStatus(ticket.status)
    });
    return ticketsDTO
  }

  async findTicketStatus(code: number): Promise<any> {
    const ticket = await this.ticketModel.findOne({code: code}).exec();
    if (!ticket) {
      return false
    }
    return new SendTicketDto()
    .setStatus(ticket.status)
  }

  async update(code: number, updateTicketDto: UpdateTicketDto): Promise<any> {
    const ticket = await this.ticketModel.findOne({
      code: code,
      status: "VALID"
    });
    if (!ticket){
      return false
    }
    updateTicketDto.status= "JOINED"
    return await this.ticketModel.findOneAndUpdate({code:code}, {status: updateTicketDto.status}, {new: true})
    
  }

  async remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
