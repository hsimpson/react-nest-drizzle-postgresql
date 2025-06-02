import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { AccountService } from '../account/account.service';

describe('AuthService', () => {
  let authService: AuthService;

  const mockAccountService = mock<AccountService>();
  const mockJwtService = mock<JwtService>();
  const mockConfigService = mock<ConfigService>();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AccountService, useValue: mockAccountService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(authService).toBeDefined();
    expect(mockConfigService.get).toHaveBeenCalledWith('jwt');
  });

  it('validateAccount_successful', async () => {
    // given
    const email = 'user@example.com';
    const password = 'password';
    mockAccountService.getAccountByEmail.mockResolvedValue({
      id: '1',
      email,
      password: await argon2.hash(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
      id: '1',
      email,
      password: await argon2.hash('wrongPassword'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // when
    const user = await authService.validateAccount(email, password);

    // then
    expect(user).toBeNull();
  });

  it('login_successful', async () => {});
});
