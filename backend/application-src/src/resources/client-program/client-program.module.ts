import { Module } from '@nestjs/common';
import { ClientProgramService } from './client-program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProgram } from './client.program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientProgram])],
  providers: [ClientProgramService],
})
export class ClientProgramModule {}
