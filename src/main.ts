import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { EntityNotFoundExceptionFilter } from './filters/entity.not.found.filters';
import { HttpExceptionFilter } from './filters/http.exeption.filters';
import dataSource from '../database/datasource.config';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import process from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    // origin: [ FULL_FRONTEND_URL ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  {
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  {
    const options = {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    };

    app.useGlobalPipes(
      new ValidationPipe({
        ...options,
      }),
    );
  }


  const config = new DocumentBuilder()
    .setTitle('4 lvl')
    .setDescription('4 lvl api swagger')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await dataSource.initialize();

  await app.listen(+process.env.SERVER_PORT);
}
bootstrap();
