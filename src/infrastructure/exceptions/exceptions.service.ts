import {
  BadRequestException,
  ConflictException,
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
  videoNotFoundException(): void {
    throw new NotFoundException('Video not found exception');
  }
  videoCommentNotFoundException(): void {
    throw new NotFoundException('Video Comment not found exception');
  }
  commentNotFoundException(): void {
    throw new NotFoundException('Comment not found exception');
  }
  likesAlreadyExistException(): void {
    throw new BadRequestException('Like already exist exception');
  }
  adoptionAlreadyExistException(): void {
    throw new BadRequestException('Adoption already exist exception');
  }
  videoIdNotMatchedException(): void {
    throw new ConflictException('Video id not matched exception');
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
