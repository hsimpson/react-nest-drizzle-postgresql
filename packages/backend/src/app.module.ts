import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { loadConfig } from './config/config';
import { DbConfigService } from './config/dbconfig.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true, load: [loadConfig] }),
    DrizzlePGModule.registerAsync({
      tag: 'DB',
      useClass: DbConfigService,
    }),
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
