import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const GLOBAL_PREFIX = 'api';

const PORT = 5555;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('Nest TODO')
    .setDescription('My first NestJS project!')
    .setVersion('0.0.1')
    .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  await app.listen(PORT);
}
bootstrap();
