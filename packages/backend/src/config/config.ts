export interface DatabaseConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  name: string;
}

export interface JwtConfig {
  accessSecret: string;
  accessExpiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface Config {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
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
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRATION ?? '',
      refreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION ?? '',
    },
  };
}
