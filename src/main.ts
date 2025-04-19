import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerUtils } from './core/swagger/swagger';
import { UserValidationMiddleware } from './core/middlewares/user-validation/user-validation.middleware';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerUtils.setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: false,
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), {
    ignoreDecorators: false,
    enableImplicitConversion: true
  }));

  app.useGlobalGuards(new UserValidationMiddleware(app.get(Reflector)));

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
