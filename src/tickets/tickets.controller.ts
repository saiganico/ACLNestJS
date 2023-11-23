import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response, response } from 'express';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Res() res: Response) {
    this.ticketsService.create(createTicketDto).then((response) => {
      if (response) {
        res.status(HttpStatus.CREATED).json(response)
        
      } else {
      res.status(HttpStatus.FOUND).send()
      }}
    )
  }

  @Get('validate/:code')
  validate(@Param('code') code: number, @Body() CreateTicketDto: CreateTicketDto, @Res() res: Response){
    this.ticketsService.validate(code).then((response) => {
      if(response){
        res.status(HttpStatus.OK).send()
      }
      else {
        res.status(HttpStatus.NOT_FOUND).send()
      }
    })
  }

  @Get('all')
  findAll(@Res() res :Response) {
    this.ticketsService.findAll().then((response) => {
      if(response){
        res.status(HttpStatus.OK).json(response)
      }
      else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
      }
    });

  }

  @Get(':code')
  findTicketStatus(@Param('code') code: number, @Res() res: Response) {
    this.ticketsService.findTicketStatus(code).then((response) => {
      if(response){
        res.status(HttpStatus.OK).json(response)
      } else {
        res.status(HttpStatus.NOT_FOUND).send()
      }

    })
  }

  @Patch(':code')
  update(@Param('code') code: number, @Body() updateTicketDto: UpdateTicketDto, @Res() res:Response) {
  this.ticketsService.update(code, updateTicketDto).then((response) => {
    console.log(response)
    if (response){
      res.status(HttpStatus.OK).json(updateTicketDto);
    }
    else {
      res.status(HttpStatus.NOT_FOUND).send()
    }
  }) ;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
