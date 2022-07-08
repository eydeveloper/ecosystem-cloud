export interface IUsersError {
  message: string;
  httpCode: number;
}

export class UsersError extends Error implements IUsersError {
  public readonly httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
