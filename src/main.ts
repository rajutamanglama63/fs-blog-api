import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cors from 'cors';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true, // Allow cookies and headers to be passed to the frontend
    }),
  );

  app.use(
    cookieSession({
      keys: ['secret'],
      name: 'auth',
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
