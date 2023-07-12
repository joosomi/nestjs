import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserServie } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserServie) {}

  @Post('users')
  @UsePipes(new ValidationPipe()) // pipe - 데이터 유효성 검사
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
  //login
  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    // console.log('loginDto', loginDto);

    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }
}
