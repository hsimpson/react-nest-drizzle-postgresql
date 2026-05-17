import { RefreshJwtStrategy } from '@/auth/strategies/refresh.strategy';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard(RefreshJwtStrategy.StrategyName) {}
