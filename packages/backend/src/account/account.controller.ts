import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AccountService } from './account.service';
import { AccountResponseDto } from './dto/account.response.dto';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Get()
  public async getAccounts(): Promise<AccountResponseDto[]> {
    const accounts = await this.accountService.findAll();
    return plainToInstance(AccountResponseDto, accounts);
  }
}
