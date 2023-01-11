import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // recibe únicamente campos del DTO, ignora indo extra q venga
      whitelist: true,
      // notifica q un campo no pertenece al DTO y detiene la acción
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Finance System Doc')
    .setDescription('API REST Finance System')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  // app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
