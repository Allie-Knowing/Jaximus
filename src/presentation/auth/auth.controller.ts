import { Body, Controller, HttpCode, HttpStatus, Post, Scope } from '@nestjs/common';
import { GoogleLoginUsecase } from 'src/usecase/auth/google-login';
import { NaverLoginUsecase } from 'src/usecase/auth/naver-login';
import { CodeDto } from './auth.dto';

@Controller({ path: '/auth', scope: Scope.REQUEST })
export class AuthController {
  constructor(private readonly googleLoginUsecase: GoogleLoginUsecase, private readonly naverLoginUsecase: NaverLoginUsecase) {}

  @Post('/google')
  @HttpCode(HttpStatus.CREATED)
  googleLogin(@Body() dto: CodeDto) {
    return this.googleLoginUsecase.execute(dto);
  }

  @Post('/apple')
  @HttpCode(HttpStatus.CREATED)
  appleLogin(@Body() dto) {
    return null;
  }

  @Post('/naver')
  @HttpCode(HttpStatus.CREATED)
  naverLogin(@Body() dto: CodeDto) {
    return this.naverLoginUsecase.execute(dto);
  }
}
