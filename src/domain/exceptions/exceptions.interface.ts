export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  questionNotFoundException(): void;
  hashtagNotFoundException(): void;
  videoNotFoundException(): void;
  videoAnswerNotFoundException(): void;
  textAnswerNotFoundException(): void;
  commentNotFoundException(): void;
  likeNotFoundException(): void;
  userNotFoundException(): void;
  userQuestionNotFoundException(): void;
  likesAlreadyExistException(): void;
  adoptionAlreadyExistException(): void;
  itIsNotQuestionException(): void;
  notEnoughIqException(): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  expiredTokenException(): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
}
