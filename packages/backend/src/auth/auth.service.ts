import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const account = await this.accountService.findByEmail(email);

    if (!account || !(await argon2.verify(account.password, password))) {
      return null;
    }

    const payload = { sub: account.id, email: account.email };

    return { accessToken: await this.jwtService.signAsync(payload), refreshToken: 'refresh' };
  }
}
