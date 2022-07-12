import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { CodeDto } from 'src/presentation/auth/auth.dto';
import { HttpService } from '@nestjs/axios';
import { oauthEnv, provider } from 'src/infrastructure/common/constants/oauth.constant';
import { User } from 'src/domain/model/user';
import { LoginService } from 'src/infrastructure/util/login.service';

export class GoogleLoginUsecase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly loginService: LoginService,
    private readonly httpService: HttpService,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(dto: CodeDto) {
    const code = dto.code;
    const params = new URLSearchParams();
    params.append('client_id', oauthEnv.google.client_id);
    params.append('client_secret', oauthEnv.google.cleint_secret);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', 'http://localhost:5000');

    const idtokenResponse = await this.httpService.axiosRef.post('https://oauth2.googleapis.com/token', params);

    const id_token = idtokenResponse.data.id_token;

    const tokeninfoResponse = await this.httpService.axiosRef.get('https://oauth2.googleapis.com/tokeninfo', {
      params: { id_token },
    });

    const data = tokeninfoResponse.data;

    if (!data.email) {
      this.exceptionsService.unauthorizedException();
    }

    let user: User;
    let isFirstLogin = false;

    user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      const userinfo = { email: data.email, name: data.name, profile: data.picture };
      user = await this.userRepository.save(userinfo, provider.google);
      isFirstLogin = true;
    } else if (user.deletedAt) {
      this.exceptionsService.userAlreadyDeletedException();
    }

    this.loginService.checkProvider(provider.google, user);

    this.loginService.saveActionPoint(user);

    return await this.loginService.getTokenResponse(user.id, isFirstLogin);
  }
}
