import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserServie {
  async createUser(createDto: CreateUserDto) {
    return createDto;
  }
}
