import { Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { LocalGuard } from './guards/local.guard';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { AuthJwtPayload } from './types/auth-jwt-payload';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  public login(@Req() req: Request) {
    return plainToInstance(LoginResponseDto, req.user);
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
}
