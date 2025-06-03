import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { waitForTime } from 'src/_test/sleep';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { LoginResponseDto } from './dto/login.response.dto';

describe('AuthController', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const doLogin = async (
    nestApp: NestExpressApplication,
    email: string,
    password: string,
  ): Promise<LoginResponseDto> => {
    const response = await request(nestApp.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(HttpStatus.CREATED);

    return response.body as LoginResponseDto;
  };

  it('login', async () => {
    const loginResponse = await doLogin(app, 'user@example.com', 'password');
    expect(loginResponse).toBeDefined();
    expect(loginResponse.accessToken).toBeDefined();
    expect(loginResponse.refreshToken).toBeDefined();
  });

  it('login with wrong credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wrong@examle.com', password: 'wrong' })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('refresh', async () => {
    const loginResponse = await doLogin(app, 'user@example.com', 'password');

    await waitForTime(1000); // Wait for a second to ensure the tokens are different

    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${loginResponse.refreshToken}`)
      .expect(HttpStatus.CREATED);

    const refreshResponse = response.body as LoginResponseDto;
    expect(refreshResponse).toBeDefined();
    expect(refreshResponse.accessToken).toBeDefined();
    expect(refreshResponse.refreshToken).toBeDefined();
    expect(refreshResponse.accessToken).not.toEqual(loginResponse.accessToken);
    expect(refreshResponse.refreshToken).not.toEqual(loginResponse.refreshToken);
  });

  it('refresh with invalid token', async () => {
    await doLogin(app, 'user@example.com', 'password');

    await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer wrong-token`)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('logout', async () => {
    const loginResponse = await doLogin(app, 'user@example.com', 'password');

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${loginResponse.accessToken}`)
      .expect(HttpStatus.CREATED);
  });
});
