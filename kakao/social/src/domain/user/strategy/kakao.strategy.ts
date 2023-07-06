import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validateHeaderName } from 'http';
import { Strategy } from 'passport-kakao';
import { UserService } from '../user.service';

@Injectable()
//KakaoStrategy 클래스는 PassportStrategy를 상속하여 구현
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: 'YOUR_KAKAO_CLIENT_ID', // 카카오 개발자 사이트에서 발급 받은 클라이언트 ID
      callbackURL: 'YOUR_CALLBACK_URL', // 카카오 로그인 콜백 URL
      // clientSecret: 'YOUR_KAKAO_CLIENT_SECRET',
    });
  }

  async validateHeaderName(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    return this.authService.validateKakaoUser(profile);
  }
  // validate 메서드는 인증 전략이 호출될 때 실행되는 메서드
  // accessToken: 카카오에서 발급된 액세스 토큰
  // refreshToken: 카카오에서 발급된 리프레시 토큰
  // profile: 카카오 사용자 프로필 정보
}
