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
  paymentHistoryNotFoundException(): void;
  actionPointNotFoundException(): void;
  textAnswerNotFoundException(): void;
  tierNotFoundException(): void;
  commentNotFoundException(): void;
  likeNotFoundException(): void;
  userNotFoundException(): void;
  userQuestionNotFoundException(): void;
  likesAlreadyExistException(): void;
  adoptionAlreadyExistException(): void;
  videoIsNotYoursException(): void;
  itIsNotQuestionException(): void;
  notEnoughIqException(): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  expiredTokenException(): void;
  questionIsAlreadyAdoptedException(): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
}
