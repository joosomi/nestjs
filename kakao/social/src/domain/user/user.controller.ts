import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @Get('login')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    //카카오 로그인 요청 처리
    //카카오 로그인 전략을 사용하여 로그인 요청 처리
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req) {
    // 카카오 로그인 콜백 처리
    // 카카오 로그인 전략을 사용하여 로그인 콜백 처리
    return req.user; // 로그인 성공 시 사용자 정보 반환
  }
}

// constructor(private readonly userService: UserService) {}

// @Post()
// create(@Body() createUserDto: CreateUserDto) {
//   return this.userService.create(createUserDto);
// }

// @Get()
// findAll() {
//   return this.userService.findAll();
// }

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.userService.findOne(+id);
// }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   return this.userService.update(+id, updateUserDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.userService.remove(+id);
// }
