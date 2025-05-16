import * as schema from '@/db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AccountService {
  public constructor(@Inject('DB') private readonly db: NodePgDatabase<typeof schema>) {}

  public async findAll() {
    return await this.db.select().from(schema.account);
  }

  public async findById(accountId: string) {
    return await this.db.query.account.findFirst({ where: (account) => eq(account.id, accountId) });
  }

  public async findByEmail(email: string) {
    return await this.db.query.account.findFirst({ where: (account) => eq(account.email, email) });
  }

  public async createSession(accountId: string, hashedRefreshToken: string) {
    await this.db.insert(schema.refresh).values({ accountId, hashedRefreshToken }).onConflictDoUpdate({
      target: schema.refresh.id,
      set: {
        hashedRefreshToken,
      },
    });
  }

  public async findSessions(accountId: string) {
    return await this.db.select().from(schema.refresh).where(eq(schema.refresh.accountId, accountId));
  }

  public async deleteSessions(accountId: string) {
    await this.db.delete(schema.refresh).where(eq(schema.refresh.accountId, accountId));
  }
}
