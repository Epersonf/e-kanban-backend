import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerUtils } from './core/swagger/swagger';
import { UserValidationMiddleware } from './core/middlewares/user-validation/user-validation.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerUtils.setupSwagger(app);

  app.useGlobalGuards(new UserValidationMiddleware(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
