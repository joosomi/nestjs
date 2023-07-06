import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  //카카오 사용자 인증 처리
  async validateKakaoUser(profile: any): Promise<any> {
    // 사용자 인증 및 로그인 처리 로직
    // 예: DB에 사용자 정보 저장 또는 검증 후 로그인 세션 생성
    // 로그인이 성공한 경우, 사용자 정보 또는 JWT 토큰 반환
    return profile;
  }
}
