export class CreateTicketDto {
  readonly code: number; 
  readonly name: string;
  readonly email: string;
  status: string;
}