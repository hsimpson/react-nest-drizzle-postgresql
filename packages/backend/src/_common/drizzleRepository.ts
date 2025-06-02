import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AnyPgTable } from 'drizzle-orm/pg-core';
import { SearchAndSortFilter } from './searchAndSortFilter';

@Injectable()
export abstract class DrizzleRepository<SchemaT extends Record<string, unknown>, TableT extends AnyPgTable> {
  public constructor(
    private readonly drizzleDb: NodePgDatabase<SchemaT>,
    private readonly _table: AnyPgTable,
  ) {}

  public get table() {
    return this._table;
  }

  public async getAll(): Promise<TableT['$inferSelect'][]> {
    return await this.drizzleDb.select().from(this._table);
  }

  public async query(filter: SearchAndSortFilter<TableT>): Promise<TableT['$inferSelect'][]> {
    return await this.drizzleDb.select().from(this._table).where(filter.getQuery()).limit(filter.limit);
  }
}
