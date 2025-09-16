import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
<<<<<<< HEAD
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
        httpOnly: true,
        secure: false, // true in production with https
        sameSite: 'lax', // required for cross-origin cookies
=======
        maxAge: 0.05 * 60 * 1000, // 3 minutes
>>>>>>> a100d1bae5fd1f47a8ff98a2ff8e8fe5f93d10db
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:7000', // frontend
    credentials: true,
  });

  app.enableCors({
    origin: 'http://localhost:7000', // Next.js URL
    credentials: true, // allow cookies to be sent
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
