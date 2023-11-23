import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type TicketDocument = Ticket & Document; 

@Schema() 
export class Ticket {
  @Prop() 
  code: number ;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  status: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);