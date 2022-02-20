import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from 'src/domain/interfaces/payload.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { JWT_SECRET_KEY } from '../constants/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly exceptionsService: ExceptionsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  public async validate(payload: IJwtPayload) {
    if (payload.type !== 'access') {
      this.exceptionsService.unauthorizedException();
    }
    return payload;
  }
}
