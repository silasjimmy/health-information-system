import { Module } from '@nestjs/common';
import { ClientProgramService } from './client-program.service';

@Module({
  providers: [ClientProgramService],
})
export class ClientProgramModule {}
