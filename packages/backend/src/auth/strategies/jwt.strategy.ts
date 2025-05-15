import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../../config/config';
import { AuthJwtPayload } from '../types/types';

const JWT_STRATEGY_NAME = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
  public static readonly StrategyName = JWT_STRATEGY_NAME;

  public constructor(private readonly configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    if (!jwtConfig) {
      throw new Error('JWT configuration is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessSecret,
    });
  }

  public validate(payload: AuthJwtPayload) {
    return payload;
  }
}
