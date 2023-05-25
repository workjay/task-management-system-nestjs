import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { GlobalExceptionFilter } from './modules/common/exception.filter';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
