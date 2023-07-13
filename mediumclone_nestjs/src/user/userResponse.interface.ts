import { UserEntity } from './user.entity';
import { UserType } from './types/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
