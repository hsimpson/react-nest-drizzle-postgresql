import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
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
  const app = await NestFactory.create(AppModule);
  registerGlobals(app);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
