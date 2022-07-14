import { HttpService } from '@nestjs/axios';
import { User } from 'src/domain/model/user';
import { oauthEnv, provider } from 'src/infrastructure/common/constants/oauth.constant';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { LoginService } from 'src/infrastructure/util/login.service';
import { CodeDto } from 'src/presentation/auth/auth.dto';

export class NaverLoginUsecase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly loginService: LoginService,
    private readonly httpService: HttpService,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(dto: CodeDto) {
    const code = dto.code;
    const accessTokenResponse = await this.httpService.axiosRef.get('https://nid.naver.com/oauth2.0/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: oauthEnv.naver.client_id,
        client_secret: oauthEnv.naver.client_secret,
        code: code,
        state: oauthEnv.naver.state,
      },
    });

    const accessToken = accessTokenResponse.data.access_token;

    const userInfoResponse = await this.httpService.axiosRef.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = userInfoResponse.data.response;

    if (!data.email) {
      this.exceptionsService.unauthorizedException();
    }

    let user: User;
    let isFirstLogin = false;

    user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      const userinfo = { email: data.email, name: data.name, profile: data.profile_image };
      user = await this.userRepository.save(userinfo, provider.naver);
      isFirstLogin = true;
    } else if (user.deletedAt) {
      this.exceptionsService.userAlreadyDeletedException();
    }

    this.loginService.checkProvider(provider.naver, user);
    this.loginService.saveActionPoint(user);

    return await this.loginService.getTokenResponse(user.id, isFirstLogin);
  }
}
