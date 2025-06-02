import { SQL } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';

interface SearchAndSortFilterI {
  getQuery(): SQL | undefined;
}

export abstract class SearchAndSortFilter<T extends PgTable> implements SearchAndSortFilterI {
  private _limit: number = 50;
  private readonly _table: T;

  public constructor(table: T) {
    this._table = table;
  }

  public get limit(): number {
    return this._limit;
  }

  public set limit(value: number) {
    this._limit = value;
  }

  public get table(): T {
    return this._table;
  }

  public abstract getQuery(): SQL | undefined;
}
