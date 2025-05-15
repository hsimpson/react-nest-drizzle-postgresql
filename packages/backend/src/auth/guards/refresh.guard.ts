import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshJwtStrategy } from '../strategies/refresh.strategy';

@Injectable()
export class RefreshAuthGuard extends AuthGuard(RefreshJwtStrategy.StrategyName) {}
