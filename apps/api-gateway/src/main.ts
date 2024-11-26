import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS if needed
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || '*',
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API Prefix
  const apiPrefix = configService.get('API_PREFIX') || '/api';
  app.setGlobalPrefix(apiPrefix);

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('E-commerce Microservices API')
    .setDescription('API documentation for E-commerce Microservices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = configService.get('SWAGGER_PATH') || '/api/docs';
  SwaggerModule.setup(swaggerPath.replace(/^\//, ''), app, document);

  // Start the server
  const port = configService.get('API_GATEWAY_PORT') || 3000;
  await app.listen(port);
  
  console.log(`
    API Gateway is running on: http://localhost:${port}
    Swagger documentation: http://localhost:${port}${swaggerPath}
    Environment: ${configService.get('NODE_ENV')}
  `);
}

bootstrap();
