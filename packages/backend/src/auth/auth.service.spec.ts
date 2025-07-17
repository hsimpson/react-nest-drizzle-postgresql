import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { Account } from '@/db/schema';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { AccountService } from '../account/account.service';

describe('AuthService', async () => {
  let authService: AuthService;

  const mockAccountService = mock<AccountService>();
  const mockConfigService = mock<ConfigService>();

  beforeEach(async () => {
    mockConfigService.get.mockReturnValue({
      accessSecret: 'access-secret',
      accessExpiresIn: '60s',
      refreshSecret: 'refresh-secret',
      refreshExpiresIn: '7d',
    });

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: AccountService, useValue: mockAccountService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const mockAccount: Account = {
    id: '1',
    email: 'user@example.com',
    password: await argon2.hash('password'),
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should be created', () => {
    expect(authService).toBeDefined();
    expect(mockConfigService.get).toHaveBeenCalledWith('jwt');
  });

  it('validateAccount_successful', async () => {
    // given
    const email = 'user@example.com';
    const password = 'password';
    mockAccountService.getAccountByEmail.mockResolvedValue({ ...mockAccount });

    // when
    const user = await authService.validateAccount(email, password);

    // then
    expect(mockAccountService.getAccountByEmail).toHaveBeenCalledWith(email);
    expect(user).not.toBeNull();
    expect(user).toEqual({ accountId: '1' });
  });

  it('validateAccount_failedWithAccountNotFound', async () => {
    // given
    const email = 'user@example.com';
    const password = 'password';
    mockAccountService.getAccountByEmail.mockResolvedValue(undefined);

    // when
    const user = await authService.validateAccount(email, password);

    // then
    expect(user).toBeNull();
  });

  it('validateAccount_failedWithWrongPassword', async () => {
    // given
    const email = 'user@example.com';
    const password = 'password';
    mockAccountService.getAccountByEmail.mockResolvedValue({
      ...mockAccount,
      password: await argon2.hash('wrongPassword'),
    });

    // when
    const user = await authService.validateAccount(email, password);

    // then
    expect(user).toBeNull();
  });

  it('login_successful', async () => {
    // given
    mockAccountService.getAccountById.mockResolvedValue({ ...mockAccount });

    // when
    const tokens = await authService.login('1');

    // then
    expect(tokens?.accessToken).toBeDefined();
    expect(tokens?.refreshToken).toBeDefined();
  });

  it('login_failedWithAccountNotFound', async () => {
    // given
    mockAccountService.getAccountById.mockResolvedValue(undefined);

    // when
    const tokens = await authService.login('1');

    // then
    expect(tokens).toBeNull();
  });

  it('refreshToken_successful', async () => {
    // given
    mockAccountService.getAccountById.mockResolvedValue({ ...mockAccount });

    // when
    const tokens = await authService.refreshToken('1');

    // then
    expect(tokens?.accessToken).toBeDefined();
    expect(tokens?.refreshToken).toBeDefined();
  });

  it('refreshToken_failedWithAccountNotFound', async () => {
    // given
    mockAccountService.getAccountById.mockResolvedValue(undefined);

    // when
    const tokens = await authService.refreshToken('1');

    // then
    expect(tokens).toBeNull();
  });
});
