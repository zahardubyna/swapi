import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { EntityNotFoundExceptionFilter } from './common/filters/entity.not.found.filters';
import { HttpExceptionFilter } from './common/filters/http.exeption.filters';
import dataSource from '../database/datasource.config';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import process from 'process';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.SERVER_PORT) || 3000

  {
    app.use(cookieParser());
    app.enableCors({
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }

  {
    const options = {
      exclude: ['/'],
    };

    app.setGlobalPrefix('api', options);
  }

  {
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  {
    // https://docs.nestjs.com/pipes#validation-pipe

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

  {
    const config = new DocumentBuilder()
      .setTitle('SWAPI')
      .setDescription('swapi api swagger')
      .addBearerAuth()
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const options = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };

    SwaggerModule.setup('docs', app, document, options);
  }

  await dataSource.initialize();

  await app.listen(port, () => {
    Logger.log(`\x1b[33m[Server]\x1b[0m \x1b[32mis running on ${port} port\x1b[0m`);
  });
}

bootstrap();
