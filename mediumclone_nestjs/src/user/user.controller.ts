import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { Request } from 'express';
import { ExpressRequest } from '@app/user/types/expressRequest.interface';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Register - createUser
  @Post('users')
  @UsePipes(new ValidationPipe()) // pipe - 데이터 유효성 검사
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
  //Login
  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    // console.log('loginDto', loginDto);

    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }

  //GET - currentUser
  //Middleware
  @Get('user')
  @UseGuards(AuthGuard) //UseGuards - protect routes
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    console.log('user', user);
    return this.userService.buildUserResponse(user);
  }

  //UPDATE
  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
