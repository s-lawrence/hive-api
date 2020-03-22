import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });  // Remove for productions!!!!
  
  const options = new DocumentBuilder()
    .setTitle('Hive Web Api')
    .setDescription('The web api documentation for Hive')
    .setVersion('1.0')
    .addTag('hive')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
