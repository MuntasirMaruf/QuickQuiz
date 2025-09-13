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
        maxAge: 0.05 * 60 * 1000, // 3 minutes
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:7000', // frontend
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
