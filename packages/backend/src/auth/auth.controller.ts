import { Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { AuthJwtPayload, ExpressRequestUser } from './types/types';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  public async login(@Req() req: Request) {
    const reqUser = req.user as ExpressRequestUser;
    const responseUser = await this.authService.login(reqUser.accountId);
    if (!responseUser) {
      throw new UnauthorizedException();
    }

    return plainToInstance(LoginResponseDto, responseUser);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  public async refresh(@Req() req: Request) {
    const user = req.user as AuthJwtPayload;
    const refresh = await this.authService.refreshToken(user.sub);
    if (!refresh) {
      throw new UnauthorizedException();
    }

    return plainToInstance(LoginResponseDto, refresh);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  public async logout(@Req() req: Request) {
    const user = req.user as AuthJwtPayload;
    // FIXME; only logout all sessions is available now
    await this.authService.logoutAll(user.sub);
  }
}
