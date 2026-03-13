import type { JwtSignOptions } from '@nestjs/jwt';

export interface DatabaseConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  name: string;
}

export type JwtExpiration = NonNullable<JwtSignOptions['expiresIn']>;

export interface JwtConfig {
  accessSecret: string;
  accessExpiresIn: JwtExpiration;
  refreshSecret: string;
  refreshExpiresIn: JwtExpiration;
}

export interface Config {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
}

function parseJwtExpiration(value: string | undefined, fallback: JwtExpiration): JwtExpiration {
  if (!value?.trim()) {
    return fallback;
  }

  const asNumber = Number(value);
  if (Number.isFinite(asNumber)) {
    return asNumber;
  }

  return value as JwtExpiration;
}

export function loadConfig(): Config {
  return {
    port: parseInt(process.env.BACKEND_PORT ?? '', 10) || 3000,
    database: {
      user: process.env.DATABASE_USER ?? '',
      password: process.env.DATABASE_PASSWORD ?? '',
      host: process.env.DATABASE_HOST ?? '',
      port: parseInt(process.env.DATABASE_PORT ?? '', 10) || 5432,
      name: process.env.DATABASE_NAME ?? '',
    },
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET ?? '',
      accessExpiresIn: parseJwtExpiration(process.env.JWT_ACCESS_EXPIRATION, '15m'),
      refreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
      refreshExpiresIn: parseJwtExpiration(process.env.JWT_REFRESH_EXPIRATION, '7d'),
    },
  };
}
