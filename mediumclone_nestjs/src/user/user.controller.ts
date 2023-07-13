import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserServie } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { Request } from 'express';
import { ExpressRequest } from './types/expressRequest.interface';

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

  //Middleware
  @Get('user')
  async currentUser(
    @Req() request: ExpressRequest,
  ): Promise<UserResponseInterface> {
    console.log('current user in controller', request.user);
    return this.userService.buildUserResponse(request.user);
  }
}
