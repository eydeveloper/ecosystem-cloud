import User from './user';

export default class UsersServices {
  static async getByAccountId(accountId: string) {
    let user = await User.findOne({accountId});

    if (!user) {
      user = new User(user);
      await user.save();
    }

    return user;
  }
}
