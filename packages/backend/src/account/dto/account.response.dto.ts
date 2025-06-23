import { Account } from '@/db/schema';
import { Expose } from 'class-transformer';

export class AccountResponseDto implements Account {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  // not exposed fields
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
}
