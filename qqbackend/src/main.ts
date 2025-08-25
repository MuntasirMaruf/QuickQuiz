import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
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
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
