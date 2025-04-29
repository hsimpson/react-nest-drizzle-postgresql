import { Injectable } from '@nestjs/common';
import { databaseSchema } from './db/schema';

@Injectable()
export class DbConfigService {
  // private readonly logger = new Logger(DbConfigService.name);

  public create = () => {
    const connectionString = process.env.DATABASE_URL;

    return {
      pg: {
        connection: 'client' as const,
        config: {
          connectionString,
        },
      },
      config: { schema: databaseSchema },
    };
  };
}
