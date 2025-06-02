import * as schema from '@/db/schema';
import { SQL, and, eq } from 'drizzle-orm';
import { SearchAndSortFilter } from 'src/_common/searchAndSortFilter';

export class RefreshFilter extends SearchAndSortFilter<typeof schema.refresh> {
  private _accountId?: string;

  public constructor() {
    super(schema.refresh);
  }

  public set accountId(accountId: string) {
    this._accountId = accountId;
  }

  public getQuery(): SQL | undefined {
    const conditions: SQL[] = [];
    if (this._accountId) {
      conditions.push(eq(this.table.accountId, this._accountId));
    }

    return and(...conditions);
  }
}
