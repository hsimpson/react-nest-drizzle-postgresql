import { InferSelectModel } from 'drizzle-orm';
import { databaseSchema } from 'src/db/schema';

export class AccountResponseDto {
  public public_id: string;
  public email: string;

  public constructor(account: InferSelectModel<typeof databaseSchema.account>) {
    this.public_id = account.public_id;
    this.email = account.email;
  }
}
