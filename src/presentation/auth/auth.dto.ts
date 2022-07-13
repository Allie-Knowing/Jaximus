import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CodeDto {
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

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

export class Userinfo {
  email: string;

  name: string;

  profile: string;
}
