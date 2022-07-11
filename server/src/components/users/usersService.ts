import User from './user';
import {UsersFormatter} from './usersFormatter';

export default class UsersService {
  static async getOrCreateByAccountId(accountId: string) {
    let user = await User.findOne({accountId});

    if (!user) {
      user = new User({accountId});
      await user.save();
    }

    return UsersFormatter.formatToUserResponse(user);
  }
}
