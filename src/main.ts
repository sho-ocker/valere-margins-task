import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtService } from "@nestjs/jwt";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  // Apply global JWT Auth Guard
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService)
  app.useGlobalGuards(new JwtAuthGuard(reflector, jwtService));

  // Swagger configuration
  const config = new DocumentBuilder()
  .setTitle('Sports Classes API')
  .setDescription('API for managing sports classes and user enrollments')
  .setVersion('1.0')
  .addTag('classes')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
