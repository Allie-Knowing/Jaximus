export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  questionNotFoundException(): void;
  videoNotFoundException(): void;
  videoCommentNotFoundException(): void;
  commentNotFoundException(): void;
  likesAlreadyExistException(): void;
  adoptionAlreadyExistException(): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  expiredTokenException(): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
}
