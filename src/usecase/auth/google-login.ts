import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { GoogleLoginDto, TokenResponse } from 'src/presentation/auth/auth.dto';
import { HttpService } from '@nestjs/axios';
import { oauthEnv, provider } from 'src/infrastructure/common/constants/oauth.constant';
import { User } from 'src/domain/model/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from 'src/infrastructure/common/constants/jwt.constant';
import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';

export class GoogleLoginUsecase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly cacheService: RedisCacheService,
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

        user = await this.userRepository.findByEmail(data.email);

        if (!user) {
          const userinfo = { email: data.email, name: data.name, profile: data.picture };
          user = await this.userRepository.save(userinfo, provider.google);
          isFirstLogin = true;
        } else if (!user.deletedAt) {
          throw new this.exceptionsService.userAlreadyDeletedException();
        }

        this.checkProvider(provider.google, user);
      });
    });

    // TODO: action-point

    return await this.getTokenResponse(user.id, isFirstLogin);
  }

  private checkProvider(provider: string, user: User) {
    if (user.provider !== provider) {
      throw new this.exceptionsService.providerNotMatchedException(user.provider);
    }
  }

  private async getTokenResponse(userId: number, isFirstLogin: boolean): Promise<TokenResponse> {
    const accessToken = this.generateJwt(userId.toString(), 'access');
    const refreshToken = this.generateJwt(userId.toString(), 'refresh');

    const key = generateCacheTemplate(CacheTemplate.REFRESH_TOKEN, userId);
    await this.cacheService.setTtl(key, refreshToken, 60 * 60 * 24 * 14);

    return {
      accessToken,
      refreshToken,
      isFirstLogin,
    };
  }

  private generateJwt(sub: string, type: string): string {
    return jwt.sign(
      {
        sub: sub,
        type: type,
      },
      JWT_SECRET_KEY,
      {
        algorithm: 'HS256',
        expiresIn: type === 'access' ? '2h' : '14d',
      },
    );
  }
}
