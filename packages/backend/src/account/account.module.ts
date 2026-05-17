import { RefreshRepository } from '@/refresh/refresh.repository';
import { Module } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [NodePgDatabase, AccountService, AccountRepository, RefreshRepository],
  exports: [AccountService],
})
export class AccountModule {}
