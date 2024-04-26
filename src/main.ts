import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const GLOBAL_PREFIX = 'api';

const PORT = 5555;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX)

  await app.listen(PORT);
}
bootstrap();
