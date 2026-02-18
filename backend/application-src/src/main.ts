import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Validate all endpoints using dtos
  app.useGlobalPipes(new ValidationPipe());

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion: '1',
  });

  // Configure bootstrap logger
  const logger = new Logger('bootstrap');

  // Bootstrap NestJS Swagger module
  const swaggerConfig = new DocumentBuilder()
    .setTitle('HMS API')
    .setDescription('Health Management System REST API documentation')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.APP_PORT ?? 3000);
  logger.log(`App listening at port ${process.env.APP_PORT} ...`);
  logger.log(`View endpoints using URL: ${await app.getUrl()}/api`);
}
bootstrap();
