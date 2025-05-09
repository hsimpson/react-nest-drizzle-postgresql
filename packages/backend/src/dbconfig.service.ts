import * as schema from '@/db/schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbConfigService {
  // private readonly logger = new Logger(DbConfigService.name);

  public create = () => {
    // TODO: use ConfigService to get the connection string
    const connectionString = process.env.DATABASE_URL;

    return {
      pg: {
        connection: 'client' as const,
        config: {
          connectionString,
        },
      },
      config: { schema },
    };
  };
}
