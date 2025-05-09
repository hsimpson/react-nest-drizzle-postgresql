import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  public accessToken: string;

  @Expose()
  public refreshToken: string;
}
