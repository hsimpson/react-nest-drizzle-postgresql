import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RefreshJwtStrategy } from '../strategies/refresh.strategy';

@Injectable()
export class RefreshAuthGuard extends AuthGuard(RefreshJwtStrategy.StrategyName) {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
