import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
/**
 * Instantiates a TypeORM instance to connect the application to the database
 */
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [], // Database tables
      synchronize: this.configService.get<boolean>('DATABASE_SYNCRONIZE'), // Set to `false` in production to avoid data loss
      logging: this.configService.get<boolean>('DATABASE_LOGGING'),
    };
  }
}
