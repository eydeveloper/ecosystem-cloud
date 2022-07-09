import {Request, Response} from 'express';
import {errorHandler} from '../../handlers/errorHandler';
import FilesServices from '../files/filesServices';
import UsersServices from './usersServices';

export default class UsersController {
  public static async getByAccountId(request: Request, response: Response) {
    try {
      const accountId = String(request.query.accountId);
      const user = await UsersServices.getByAccountId(accountId);
      await FilesServices.createRootDirectory(user.id);
      response.send(user);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
