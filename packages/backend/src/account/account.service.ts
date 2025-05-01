import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { databaseSchema } from '../db/schema';

@Injectable()
export class AccountService {
  public constructor(@Inject('DB') private readonly drizzle: NodePgDatabase<typeof databaseSchema>) {}

  public async findAll() {
    const accounts = await this.drizzle.query.account.findMany();

    return accounts;
  }
}
