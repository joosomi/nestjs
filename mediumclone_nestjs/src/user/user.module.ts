import { Module } from '@nestjs/common';
import { UserController } from '@app/user/user.controller';
import { UserServie } from '@app/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserServie],
})
export class UserModule {}
