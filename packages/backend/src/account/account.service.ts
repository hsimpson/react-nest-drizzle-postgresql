import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';

@Injectable()
export class AccountService {
  public constructor(@Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>) {}

  public findAll() {
    const accounts = this.drizzle.query.account.findMany();

    return accounts;
  }
}
