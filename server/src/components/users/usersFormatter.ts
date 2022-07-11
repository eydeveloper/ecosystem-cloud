import {UserResponse} from './types';
import {IUser} from './user';

export class UsersFormatter {
  static formatToUserResponse(user: IUser): UserResponse {
    return {
      id: user.id.toString(),
      limitSpace: user.limitSpace,
      usedSpace: user.usedSpace
    };
  }
}
