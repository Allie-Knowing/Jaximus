import { Body, Controller, HttpCode, HttpStatus, Post, Scope } from '@nestjs/common';
import { GoogleLoginUsecase } from 'src/usecase/auth/google-login';
import { GoogleLoginDto } from './auth.dto';

@Controller({ path: '/auth', scope: Scope.REQUEST })
export class AuthController {
  constructor(private readonly googleLoginUsecase: GoogleLoginUsecase) {}

  @Post('/google')
  @HttpCode(HttpStatus.CREATED)
  googleLogin(@Body() dto: GoogleLoginDto) {
    return this.googleLoginUsecase.execute(dto);
  }

  @Post('/apple')
  @HttpCode(HttpStatus.CREATED)
  appleLogin(@Body() dto) {
    return null;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  naverLogin(@Body() dto) {
    return null;
  }
}
