import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './resources/user/user.module';
import { ClientModule } from './resources/client/client.module';
import { ProgramModule } from './resources/program/program.module';
import { AuthModule } from './resources/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/typeorm.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10, // Limit to 10 requests per minute per IP address
        },
      ],
    }),
    AuthModule,
    UserModule,
    ClientModule,
    ProgramModule,
  ],
})
export class AppModule {}
