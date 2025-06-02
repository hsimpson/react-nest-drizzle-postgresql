import * as schema from '@/db/schema';
import { Refresh } from '@/db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleRepository } from 'src/_common/drizzleRepository';

@Injectable()
export class RefreshRepository extends DrizzleRepository<typeof schema, typeof schema.refresh> {
  public constructor(@Inject('DB') private readonly db: NodePgDatabase<typeof schema>) {
    super(db, schema.refresh);
  }

  public async createSession(accountId: string, hashedRefreshToken: string): Promise<void> {
    await this.db.insert(schema.refresh).values({ accountId, hashedRefreshToken }).onConflictDoUpdate({
      target: schema.refresh.id,
      set: {
        hashedRefreshToken,
      },
    });
  }

  public async findSessions(accountId: string): Promise<Refresh[]> {
    return await this.db.select().from(schema.refresh).where(eq(schema.refresh.accountId, accountId));
  }

  public async deleteSessions(accountId: string): Promise<void> {
    await this.db.delete(schema.refresh).where(eq(schema.refresh.accountId, accountId));
  }
}
