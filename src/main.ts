import { AppConfigService } from './config/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = await app.get(AppConfigService);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  // await app.listen(3000);
  await app.listen(appConfig.PORT || 3000);
}
bootstrap();
