import { Body, Controller, Post } from '@nestjs/common';
import { UserServie } from '@app/user/user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserServie) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }
}
