import * as schema from '@/db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AccountService {
  public constructor(@Inject('DB') private readonly db: NodePgDatabase<typeof schema>) {}

  public async findAll() {
    return await this.db.query.account.findMany();
  }

  public async findByEmail(email: string) {
    return await this.db.query.account.findFirst({ where: (account) => eq(account.email, email) });
  }
}
