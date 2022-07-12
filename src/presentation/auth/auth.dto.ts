import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  code: string;
}

export class TokenResponse {
  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  @Expose({ name: 'is_first_login' })
  isFirstLogin: boolean;
}

export class Userinfo {
  email: string;

  name: string;
  
  profile: string;
}
