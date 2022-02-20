export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  questionNotFoundException(): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  expiredTokenException(): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
}
