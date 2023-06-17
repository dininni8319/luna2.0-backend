export class HttpError extends Error {
  public code: number = 0
  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;
  }
};

export const customError = (msg: string, errorCode: number) => {
  return new HttpError(msg, errorCode);
}



