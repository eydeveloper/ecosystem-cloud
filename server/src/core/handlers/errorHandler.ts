import {Response} from 'express';
import {AppError} from '../errors/appError';

class ErrorHandler {
  public handleError(error: any, response: Response) {
    if (error instanceof AppError) {
      response.status(error.httpCode).json({message: error.message});
    } else {
      console.log(error);
      response.status(500).json({message: String(error)});
    }
  };
}

export const errorHandler = new ErrorHandler();
