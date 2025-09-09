import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 5 * 60 * 1000, // 3 minutes
        httpOnly: true,
        secure: false, // true in production with https
        sameSite: 'lax', // required for cross-origin cookies
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:7000', // Next.js URL
    credentials: true, // allow cookies to be sent
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
