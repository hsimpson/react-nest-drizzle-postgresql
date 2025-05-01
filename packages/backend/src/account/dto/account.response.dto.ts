import { Expose } from 'class-transformer';

export class AccountResponseDto {
  @Expose()
  public public_id: string;

  @Expose()
  public email: string;
}
