import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { LoginResponseDto } from './dto/login.response.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalGuard)
  public login(@Req() req: Request) {
    return plainToInstance(LoginResponseDto, req.user);
  }
}
