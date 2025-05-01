import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AccountService } from './account.service';
import { AccountResponseDto } from './dto/account.response.dto';

@Controller('account')
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Get()
  public async getAccounts(): Promise<AccountResponseDto[]> {
    const accounts = await this.accountService.findAll();
    return plainToInstance(AccountResponseDto, accounts);
  }
}
