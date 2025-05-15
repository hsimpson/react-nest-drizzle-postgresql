import * as schema from '@/db/schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { JwtConfig } from 'src/config/config';
import { AccountService } from '../account/account.service';
import { AuthJwtPayload, ExpressRequestUser, JwtTokens } from './types/types';

@Injectable()
export class AuthService {
  private readonly jwtConfig: JwtConfig | undefined;

  public constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
  }

  public async validateAccount(email: string, password: string): Promise<ExpressRequestUser | null> {
    const account = await this.accountService.findByEmail(email);

    if (!account || !(await argon2.verify(account.password, password))) {
      return null;
    }

    return { accountId: account.id };
  }

  public async login(accountId: string): Promise<JwtTokens | null> {
    const account = await this.accountService.findById(accountId);
    if (!account) {
      return null;
    }

    return this.generateTokens(account);
  }

  public async refreshToken(accountId: string) {
    const account = await this.accountService.findById(accountId);

    if (!account) {
      return null;
    }

    return this.generateTokens(account);
  }

  private async generateTokens(account: typeof schema.account.$inferSelect) {
    const payload: AuthJwtPayload = { sub: account.id, email: account.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),

      this.jwtService.signAsync(payload, {
        secret: this.jwtConfig?.refreshSecret,
        expiresIn: this.jwtConfig?.refreshExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
