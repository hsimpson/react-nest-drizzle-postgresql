import { Module } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [NodePgDatabase, AccountService],
  exports: [AccountService],
})
export class AccountModule {}
