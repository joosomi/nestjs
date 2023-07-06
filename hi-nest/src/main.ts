//main.ts - mandatory name

import { ValidationPipe } from '@nestjs/common';
//validationpipe 사용을 위해 class-validator, class-transformer 설치
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //하나라도 사용하지 않는 모든 속성 개체 제거
      forbidNonWhitelisted: true, //예외를 throw
      transform: true, //유저들이 보낸 우리가 원하는 타입을 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
