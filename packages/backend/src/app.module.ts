import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbConfigService } from './dbconfig.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
