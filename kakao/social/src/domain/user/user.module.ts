import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, KakaoStrategy],
  exports: [UserService],
})
export class UserModule {}
