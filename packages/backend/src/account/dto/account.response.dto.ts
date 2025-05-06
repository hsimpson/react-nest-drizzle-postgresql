import * as schema from '@/db/schema';
import { Expose } from 'class-transformer';
import { InferSelectModel } from 'drizzle-orm';

type Account = InferSelectModel<typeof schema.account>;

export class AccountResponseDto implements Account {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  // not exposed fields
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
}
