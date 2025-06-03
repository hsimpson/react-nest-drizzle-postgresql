import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../../config/config';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/types';

const JWT_STRATEGY_NAME = 'refresh-jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
  public static readonly StrategyName = JWT_STRATEGY_NAME;

  public constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    if (!jwtConfig) {
      throw new Error('JWT configuration is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.refreshSecret,
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();

    if (!refreshToken) {
      return null;
    }

    if (!(await this.authService.validateRefreshToken(payload.sub, refreshToken))) {
      return null;
    }

    return payload;
  }
}
