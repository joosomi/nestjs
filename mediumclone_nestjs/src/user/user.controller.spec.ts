// user.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    createUser: jest.fn(async (dto: CreateUserDto) => {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      return {
        ...dto,
        password: hashedPassword,
      };
    }),

    buildUserResponse: jest.fn((user: UserEntity) => {
      return {
        user: {
          username: user.username,
          email: user.email,
          password: expect.anything(),
        },
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      username: 'Somi',
      email: 'hello@gmail.com',
      password: 'hero',
    };

    const result = await controller.createUser(dto);

    // 기대되는 반환 값 직접 작성
    const expected = {
      user: {
        username: dto.username,
        email: dto.email,
        password: expect.anything(),
      },
    };

    expect(result).toEqual(expected);

    expect(mockUserService.createUser).toHaveBeenCalled();
  });

  // //UPDATE
  // it('should update a user', async () => {
  //   // 기존 사용자 정보
  //   const user: UserEntity = {
  //     id: 1,
  //     username: 'ExistingUser',
  //     email: 'existinguser@example.com',
  //     bio: 'Old bio',
  //     image: 'old_image.jpg',
  //     password: 'hashed_password',
  //   };

  //   // 업데이트할 사용자 정보
  //   const updateUserDto: UpdateUserDto = {
  //     username: 'NewUsername',
  //     email: 'newemail@example.com',
  //     bio: 'New bio',
  //     image: 'new_image.jpg',
  //   };

  //   // 모의 함수로 사용자 정보 업데이트
  //   const updatedUser = await controller.updateCurrentUser(updateUserDto);

  //   // 기대되는 반환 값
  //   const expected = {
  //     ...user, // 기존 사용자 정보
  //     ...updateUserDto, // 업데이트된 사용자 정보
  //   };

  //   expect(updatedUser).toEqual(expected);

  //   expect(mockUserService.updateCurrentUser).toHaveBeenCalledWith(
  //     updateUserDto,
  //   );
  // });
});
