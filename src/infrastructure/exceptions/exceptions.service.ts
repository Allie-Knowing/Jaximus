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
  textAnswerNotFoundException(): void {
    throw new NotFoundException('Text answer not found exception');
  }
  hashtagNotFoundException(): void {
    throw new NotFoundException('Hashtag not found exception');
  }
  questionNotFoundException(): void {
    throw new NotFoundException('Question not found exception');
  }
  videoNotFoundException(): void {
    throw new NotFoundException('Video not found exception');
  }
  videoAnswerNotFoundException(): void {
    throw new NotFoundException('Video answer not found exception');
  }
  commentNotFoundException(): void {
    throw new NotFoundException('Comment not found exception');
  }
  likeNotFoundException(): void {
    throw new NotFoundException('Like not found excpetion');
  }
  userNotFoundException(): void {
    throw new NotFoundException('User not found exception');
  }
  userQuestionNotFoundException(): void {
    throw new NotFoundException('User question not found excpetion');
  }
  likesAlreadyExistException(): void {
    throw new BadRequestException('Like already exist exception');
  }
  itIsNotQuestionException(): void {
    throw new BadRequestException('It is not question exception');
  }
  adoptionAlreadyExistException(): void {
    throw new BadRequestException('Adoption already exist exception');
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
