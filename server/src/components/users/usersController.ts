import {errorHandler} from '../../core/handlers/errorHandler';
import {TypedRequestBody} from '../../core/types/typedRequestBody';
import {TypedResponse} from '../../core/types/typedResponse';
import {AuthBody} from '../auth/types';
import FilesService from '../files/filesService';
import {UserResponse} from './types';
import UsersService from './usersService';

export default class UsersController {
  static async get(
    request: TypedRequestBody<AuthBody>,
    response: TypedResponse<UserResponse>
  ) {
    try {
      const {id} = request.body.user;
      const user = await UsersService.getOrCreateByAccountId(String(id));
      await FilesService.createRootDirectory(user.id.toString());
      return response.json(user);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
