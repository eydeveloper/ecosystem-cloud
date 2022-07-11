import {errorHandler} from '../../core/handlers/errorHandler';
import {TypedRequestQuery} from '../../core/types/typedRequestQuery';
import {TypedResponse} from '../../core/types/typedResponse';
import FilesService from '../files/filesService';
import {UserResponse} from './types';
import UsersService from './usersService';

export default class UsersController {
  static async getByAccountId(
    request: TypedRequestQuery<{ accountId: string }>,
    response: TypedResponse<UserResponse>
  ) {
    try {
      const {id} = request.body.user;
      const user = await UsersService.getByAccountId(id);
      await FilesService.createRootDirectory(user.id.toString());
      return response.json(user);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
