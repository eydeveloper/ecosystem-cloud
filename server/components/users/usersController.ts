import {TypedRequestQuery} from '../../core/types/typedRequestQuery';
import {TypedResponse} from '../../core/types/typedResponse';
import {errorHandler} from '../../core/handlers/errorHandler';
import FilesServices from '../files/filesServices';
import {IUser} from './user';
import UsersServices from './usersServices';

export default class UsersController {
  static async getByAccountId(
    request: TypedRequestQuery<{ accountId: string }>,
    response: TypedResponse<IUser>
  ) {
    try {
      const {accountId} = request.query;
      const user = await UsersServices.getByAccountId(accountId);
      await FilesServices.createRootDirectory(user.id.toString());
      response.json(user);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
