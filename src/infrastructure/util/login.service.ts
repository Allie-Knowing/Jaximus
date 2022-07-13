import { Injectable } from '@nestjs/common';
import { ExceptionsService } from '../exceptions/exceptions.service';
import * as jwt from 'jsonwebtoken';
import { RedisCacheService } from '../config/redis/redis-cache.service';
import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { User } from 'src/domain/model/user';
import { JWT_SECRET_KEY } from '../common/constants/jwt.constant';
import { TokenResponse } from 'src/presentation/auth/auth.dto';
import { DatabaseActionPointRepository } from '../repositories/action-point.repository';

@Injectable()
export class LoginService {
  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly actionPointRepository: DatabaseActionPointRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  public checkProvider(provider: string, user: User) {
    if (user.provider !== provider) {
      throw new this.exceptionsService.providerNotMatchedException(user.provider);
    }
  }

  public async getTokenResponse(userId: number, isFirstLogin: boolean): Promise<TokenResponse> {
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

  public async saveActionPoint(user: User) {
    const loginTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_LOGIN, user.id);
    const actionLogin = await this.cacheService.get(loginTemplateKey);
    if(!actionLogin) {
        await this.cacheService.setTtl(loginTemplateKey, 'x', 57600);
        await this.actionPointRepository.saveActionPoint(user, 1);
    }
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
