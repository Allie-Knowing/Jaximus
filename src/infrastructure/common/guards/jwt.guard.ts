import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly exceptionsService: ExceptionsService) {
    super();
  }

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      this.exceptionsService.expiredTokenException();
    } else if (err) {
      this.exceptionsService.unauthorizedException();
    }
    return user;
  }
}
