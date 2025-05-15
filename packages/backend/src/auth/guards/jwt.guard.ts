import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtStrategy.StrategyName) {}
