import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate all endpoints using dtos
  app.useGlobalPipes(new ValidationPipe());

  // Configure bootstrap logger
  const logger = new Logger('bootstrap');

  // Bootstrap NestJS Swagger module
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CEMA HMS API')
    .setDescription('CEMA health system REST API documentation')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.APP_PORT ?? 3000);
  logger.log(`App listening at port ${process.env.APP_PORT} ...`);
  logger.log(`View endpoints using URL: ${await app.getUrl()}/api`);
}
bootstrap();
