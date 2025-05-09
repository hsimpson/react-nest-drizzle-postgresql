import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
