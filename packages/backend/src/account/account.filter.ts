import * as schema from '@/db/schema';
import { and, eq, SQL } from 'drizzle-orm';
import { SearchAndSortFilter } from '../_common/searchAndSortFilter';

export class AccountFilter extends SearchAndSortFilter<typeof schema.account> {
  private _id?: string;
  private _email?: string;

  public constructor() {
    super(schema.account);
  }

  public set id(id: string) {
    this._id = id;
  }

  public set email(email: string) {
    this._email = email;
  }

  public getQuery(): SQL | undefined {
    const conditions: SQL[] = [];
    if (this._id) {
      conditions.push(eq(this.table.id, this._id));
    }

    if (this._email) {
      conditions.push(eq(this.table.email, this._email));
    }

    return and(...conditions);
  }
}
