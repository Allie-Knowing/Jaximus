import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException, IFormatExceptionMessage } from 'src/domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  questionNotFoundException(): void {
    throw new NotFoundException('Question not found exception');
  }
  videoCommentNotFoundException(): void {
    throw new NotFoundException('Video Comment not found exception');
  }
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  expiredTokenException(): void {
    throw new UnauthorizedException('Token expired exception');
  }
}
