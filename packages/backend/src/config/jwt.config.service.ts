import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { JwtConfig } from './config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  public constructor(private readonly configService: ConfigService) {}

  public createJwtOptions(): JwtModuleOptions {
    const jwtConfig = this.configService.get<JwtConfig>('jwt');

    if (!jwtConfig) {
      throw new Error('JWT configuration is not defined');
    }

    return {
      global: true,
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: jwtConfig.accessExpiresIn },
    };
  }
}
