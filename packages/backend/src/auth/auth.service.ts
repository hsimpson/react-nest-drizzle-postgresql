import * as schema from '@/db/schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { JwtConfig } from 'src/config/config';
import { AccountService } from '../account/account.service';
import { AuthJwtPayload } from './types/auth-jwt-payload';

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

  public async validateUser(email: string, password: string) {
    const account = await this.accountService.findByEmail(email);

    if (!account || !(await argon2.verify(account.password, password))) {
      return null;
    }

    return this.getTokens(account);
  }

  public async refreshToken(userId: string) {
    const account = await this.accountService.findById(userId);

    if (!account) {
      return null;
    }

    return this.getTokens(account);
  }

  private async getTokens(account: typeof schema.account.$inferSelect) {
    const payload: AuthJwtPayload = { sub: account.id, email: account.email };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig?.refreshSecret,
      expiresIn: this.jwtConfig?.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
