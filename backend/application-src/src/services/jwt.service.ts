import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
/**
 * Defines the Jwt configuration options for injection
 */
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: '24h',
      },
    };
  }
}
