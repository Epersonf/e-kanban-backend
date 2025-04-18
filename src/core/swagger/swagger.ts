import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Constants } from '../constants/constants';
import { INestApplication } from '@nestjs/common';

export class SwaggerUtils {
  static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('e-Kanban API')
      .setDescription('The e-Kanban API, an open-source kanban project by Eperson')
      .setVersion('1.0')
      .addServer(Constants.msUrl)
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);
  }
}
