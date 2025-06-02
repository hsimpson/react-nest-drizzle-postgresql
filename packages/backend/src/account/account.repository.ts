import * as schema from '@/db/schema';
import { Account } from '@/db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleRepository } from 'src/_common/drizzleRepository';
import { AccountFilter } from './account.filter';

@Injectable()
export class AccountRepository extends DrizzleRepository<typeof schema, typeof schema.account> {
  public constructor(@Inject('DB') private readonly db: NodePgDatabase<typeof schema>) {
    super(db, schema.account);
  }

  public async getById(id: string): Promise<Account | undefined> {
    const filter = new AccountFilter();
    filter.id = id;
    const [item] = await this.query(filter);
    return item;
  }

  public async getByEmail(email: string): Promise<Account | undefined> {
    const filter = new AccountFilter();
    filter.email = email;
    const [item] = await this.query(filter);
    return item;
  }
}
