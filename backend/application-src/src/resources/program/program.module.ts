import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/services/jwt.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Program]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
