import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';
import { config } from 'dotenv';
config();


@Module({
  imports: [
  MongooseModule.forRoot(process.env.DATABASE_URI),
  TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
