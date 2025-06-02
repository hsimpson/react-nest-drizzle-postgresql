import { Injectable } from '@nestjs/common';
import { RefreshRepository } from 'src/refresh/refresh.repository';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  public constructor(
    private readonly accountRepository: AccountRepository,
    private readonly refreshRepository: RefreshRepository,
  ) {}

  public async getAllAccounts() {
    return await this.accountRepository.getAll();
  }

  public async getAccountById(accountId: string) {
    return await this.accountRepository.getById(accountId);
  }

  public async getAccountByEmail(email: string) {
    return await this.accountRepository.getByEmail(email);
  }

  public async createSession(accountId: string, hashedRefreshToken: string) {
    await this.refreshRepository.createSession(accountId, hashedRefreshToken);
  }

  public async findSessions(accountId: string) {
    return await this.refreshRepository.findSessions(accountId);
  }

  public async deleteSessions(accountId: string) {
    await this.refreshRepository.deleteSessions(accountId);
  }
}
