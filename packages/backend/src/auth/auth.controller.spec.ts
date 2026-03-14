import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response.dto';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = mock<AuthService>();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = moduleFixture.get<AuthController>(AuthController);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('login_successful', async () => {
    // given
    const request = { user: { accountId: '1' } } as unknown as Request;
    const expectedResponse = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };
    mockAuthService.login.mockResolvedValue(expectedResponse);

    // when
    const response = await authController.login(request);

    // then
    expect(mockAuthService.login).toHaveBeenCalledWith('1');
    expect(response).toBeInstanceOf(LoginResponseDto);
    expect(response).toEqual(expectedResponse);
  });

  it('login_failedWithUnauthorizedException', async () => {
    // given
    const request = { user: { accountId: '1' } } as unknown as Request;
    mockAuthService.login.mockResolvedValue(null);

    // when & then
    await expect(authController.login(request)).rejects.toThrow(UnauthorizedException);
  });

  it('refresh_successful', async () => {
    // given
    const request = { user: { sub: '1', email: 'user@example.com' } } as unknown as Request;
    const expectedResponse = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    };
    mockAuthService.refreshToken.mockResolvedValue(expectedResponse);

    // when
    const response = await authController.refresh(request);

    // then
    expect(mockAuthService.refreshToken).toHaveBeenCalledWith('1');
    expect(response).toBeInstanceOf(LoginResponseDto);
    expect(response).toEqual(expectedResponse);
  });

  it('refresh_failedWithUnauthorizedException', async () => {
    // given
    const request = { user: { sub: '1', email: 'user@example.com' } } as unknown as Request;
    mockAuthService.refreshToken.mockResolvedValue(null);

    // when & then
    await expect(authController.refresh(request)).rejects.toThrow(UnauthorizedException);
  });

  it('logout_successful', async () => {
    // given
    const request = { user: { sub: '1', email: 'user@example.com' } } as unknown as Request;
    mockAuthService.logoutAll.mockResolvedValue();

    // when
    await authController.logout(request);

    // then
    expect(mockAuthService.logoutAll).toHaveBeenCalledWith('1');
  });
});
