import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './resources/user/user.module';
import { ClientModule } from './resources/client/client.module';
import { ProgramModule } from './resources/program/program.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ClientModule,
    ProgramModule,
    AuthModule,
  ],
})
export class AppModule {}
