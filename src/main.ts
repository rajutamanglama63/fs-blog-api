import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;

  app.use(
    cookieSession({
      keys: ['secret'],
    }),
  );

  // app.useStaticAssets(path.join(__dirname, '../tempFile'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  Logger.log(`Application started on port: ${port}`);
}
bootstrap();
