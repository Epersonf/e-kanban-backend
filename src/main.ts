import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerUtils } from './core/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerUtils.setupSwagger(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
