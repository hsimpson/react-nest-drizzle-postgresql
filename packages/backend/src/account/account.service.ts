import * as schema from '@/db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AccountService {
  public constructor(@Inject('DB') private readonly db: NodePgDatabase<typeof schema>) {}

  public async findAll() {
    const accounts = await this.db.query.account.findMany();

    return accounts;
  }
}
