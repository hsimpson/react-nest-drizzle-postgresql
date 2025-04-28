import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConfigService } from './dbconfig.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzlePGModule.registerAsync({
      tag: 'DB',
      useClass: DbConfigService,
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
