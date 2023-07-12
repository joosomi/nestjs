import { UserEntity } from '../user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
//비밀번호만 제거하고 type
