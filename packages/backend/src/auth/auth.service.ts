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

    const { accessToken, refreshToken } = await this.generateTokens(account);
    await this.saveRefreshToken(accountId, refreshToken);

    return { accessToken, refreshToken };
  }

  public async refreshToken(accountId: string) {
    const account = await this.accountService.findById(accountId);

    if (!account) {
      return null;
    }

    const { accessToken, refreshToken } = await this.generateTokens(account);
    await this.saveRefreshToken(accountId, refreshToken);

    return { accessToken, refreshToken };
  }

  public async validateRefreshToken(accountId: string, refreshToken: string) {
    const sessions = await this.accountService.findSessions(accountId);

    for (const session of sessions) {
      if (await argon2.verify(session.hashedRefreshToken, refreshToken)) {
        return true;
      }
    }

    return false;
  }

  public async logoutAll(accountId: string) {
    await this.accountService.deleteSessions(accountId);
  }

  private async saveRefreshToken(accountId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.accountService.createSession(accountId, hashedRefreshToken);
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
