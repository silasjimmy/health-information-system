import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ProgramService } from '../program/program.service';
import { Program } from '../program/entities/program.entity';
import { ClientProgramService } from '../client-program/client-program.service';
import { ClientProgram } from '../client-program/client.program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Program, ClientProgram])],
  controllers: [ClientController],
  providers: [ClientService, ProgramService, ClientProgramService],
})
export class ClientModule {}
