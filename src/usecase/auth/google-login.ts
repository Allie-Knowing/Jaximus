import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { GoogleLoginDto } from 'src/presentation/auth/auth.dto';
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

  async execute(dto: GoogleLoginDto) {
    const code = dto.code;
    const params = new URLSearchParams();
    params.append('client_id', oauthEnv.google.client_id);
    params.append('client_secret', oauthEnv.google.cleint_secret);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');

    const idtokenResponse = this.httpService.post('https://oauth2.googleapis.com/token', params);

    let user: User;
    let isFirstLogin = false;

    idtokenResponse.subscribe((res) => {
      const id_token = res.data.id_token;
      const tokeninfoResponse = this.httpService.get('https://oauth2.googleapis.com/tokeninfo', {
        params: { id_token },
      });

      tokeninfoResponse.subscribe(async (res) => {
        const data = res.data;

        if (!data.email) {
          throw new this.exceptionsService.badRequestException(data);
        }
        
        user = await this.userRepository.findByEmail(data.email);

        if (!user) {
          const userinfo = { email: data.email, name: data.name, profile: data.picture };
          user = await this.userRepository.save(userinfo, provider.google);
          isFirstLogin = true;
        } else if (!user.deletedAt) {
          throw new this.exceptionsService.userAlreadyDeletedException();
        }

        this.loginService.checkProvider(provider.google, user);
      });
    });

    // TODO: action-point

    return await this.loginService.getTokenResponse(user.id, isFirstLogin);
  }
}
