import {Response} from 'express';
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import {AppError} from '../errors/appError';

class ErrorHandler {
  public handleError(error: any, response: Response) {
    if (error instanceof AppError) {
      response.status(error.httpCode).json({message: error.message});
    } else if (error instanceof TokenExpiredError) {
      response.status(401).json({message: 'Срок действия токена истек.'});
    } else if (error instanceof JsonWebTokenError) {
      response.status(401).json({message: 'Некорректная сигнатура токена.'})
    } else {
      response.status(500).json({message: String(error)});
    }
  };
}

export const errorHandler = new ErrorHandler();
