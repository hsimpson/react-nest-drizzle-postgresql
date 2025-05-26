import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

function registerGlobals(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      // TODO: disable error messages in production
      disableErrorMessages: false,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  registerGlobals(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port ?? 3000);
}

void bootstrap();
