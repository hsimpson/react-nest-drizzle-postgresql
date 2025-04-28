import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Get()
  public getAccounts() {
    return this.accountService.findAll();
  }
}
