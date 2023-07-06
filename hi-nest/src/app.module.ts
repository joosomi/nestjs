import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';

//decorator Module
@Module({
  imports: [MoviesModule], //모듈 분리
  controllers: [AppController], //url 가져오고 함수 실행 - express의 라우터 같은
  providers: [],
})
export class AppModule {}
