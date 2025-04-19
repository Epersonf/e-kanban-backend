import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Constants } from '../constants/constants';
import { INestApplication } from '@nestjs/common';
import { UserValidationAuthName } from '../middlewares/user-validation/user-validation.decorator';
import * as fs from 'fs';
import * as path from 'path';

export class SwaggerUtils {
  static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('e-Kanban API')
      .setDescription('The e-Kanban API, an open-source kanban project by Eperson')
      .setVersion('1.0')
      .addServer(Constants.msUrl)
      .addBearerAuth({
        name: 'User Validation',
        type: 'http',
      }, UserValidationAuthName)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    // const outputPath = path.resolve(process.cwd(), 'swagger.json');
    // fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));

    SwaggerModule.setup('api', app, document);
  }
}