import {Response} from 'express';
import {AppError} from '../exceptions/appError';

class ErrorHandler {
  public handleError(error: any, response: Response) {
    if (error instanceof AppError) {
      response.status(error.httpCode).send({message: error.message});
    }

    response.status(500).send({message: String(error)});
  };
}

export const errorHandler = new ErrorHandler();
