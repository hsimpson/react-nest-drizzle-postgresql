import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { JwtConfig } from 'src/config/config';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async validateUser(email: string, password: string) {
    const jwtConfig = this.configService.get<JwtConfig>('jwt');

    const account = await this.accountService.findByEmail(email);

    if (!account || !(await argon2.verify(account.password, password))) {
      return null;
    }

    const payload = { sub: account.id, email: account.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConfig?.refreshSecret,
      expiresIn: jwtConfig?.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
