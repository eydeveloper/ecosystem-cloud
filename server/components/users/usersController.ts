import {Request, Response} from 'express';
import {UsersError} from './usersError';
import UsersServices from './usersServices';

export default class UsersController {
  static async getByAccountId(request: Request, response: Response) {
    try {
      const accountId = request.query.accountId;

      if (!accountId) {
        throw new UsersError('Не удалось получить идентификатор пользователя.', 400);
      }

      let user = await UsersServices.findOne({accountId});

      if (!user) {
        user = await UsersServices.create({accountId});
      }

      const {id, limitSpace, usedSpace} = user;

      response.send({user: {id, limitSpace, usedSpace}});
    } catch (error) {
      if (error instanceof UsersError) {
        response.status(error.httpCode).send({message: error.message});
      } else {
        response.status(500).send({message: 'Произошла неизвестная ошибка.'});
      }
    }
  }
}
