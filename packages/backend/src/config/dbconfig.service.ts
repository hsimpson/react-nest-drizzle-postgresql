import * as schema from '@/db/schema';
import { DrizzlePGConfig } from '@knaadh/nestjs-drizzle-pg';
import { ConfigurableModuleOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config';

@Injectable()
export class DbConfigService implements ConfigurableModuleOptionsFactory<DrizzlePGConfig, 'create'> {
  public constructor(private readonly configService: ConfigService) {}

  public create = (): DrizzlePGConfig => {
    const dbConfig = this.configService.get<DatabaseConfig>('database');

    if (!dbConfig) {
      throw new Error('Database configuration is not defined');
    }

    return {
      pg: {
        connection: 'client' as const,
        config: {
          user: dbConfig.user,
          password: dbConfig.password,
          host: dbConfig.host,
          port: dbConfig.port,
          database: dbConfig.name,
        },
      },
      config: { schema },
    };
  };
}
