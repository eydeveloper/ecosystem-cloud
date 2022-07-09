import User from './user';

export default class UsersServices {
  public static async getByAccountId(accountId: string) {
    let user = await User.findOne({accountId});

    if (!user) {
      user = await UsersServices.create({accountId});
    }

    return user;
  }

  public static async create(fields: {}) {
    const user = new User(fields);
    await user.save();
    return user;
  }
}
