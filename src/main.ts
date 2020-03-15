import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });  // Remove for productions!!!!
  await app.listen(3000);
}
bootstrap();
