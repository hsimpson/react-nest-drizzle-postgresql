import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { ExpressRequestUser } from '@/auth/types/types';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AccountService } from './account.service';
import { AccountResponseDto } from './dto/account.response.dto';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Get('me')
  public async getMe(@Req() req: Request): Promise<AccountResponseDto> {
    const reqUser = req.user as ExpressRequestUser;
    const accounts = await this.accountService.getAccountById(reqUser.accountId);
    return plainToInstance(AccountResponseDto, accounts);
  }
}
