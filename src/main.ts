import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dataSource from '../database/datasource.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('4 lvl')
    .setDescription('4 lvl api swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await dataSource.initialize();

  await app.listen(3000);
}
bootstrap();
