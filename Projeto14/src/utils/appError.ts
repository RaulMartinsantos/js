class AppError {
  message: string;
  errorCode: number;

  constructor(message: string, errorCode: number = 400) {
    this.message = message;
    this.errorCode = errorCode;
  }
}

export { AppError };
