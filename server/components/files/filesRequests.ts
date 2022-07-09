import {Request} from 'express';

export interface CreateDirectoryRequest<T> extends Request {
  body: T;
}
