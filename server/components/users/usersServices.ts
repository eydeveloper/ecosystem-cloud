import User from './user';

export default class UsersServices {
  static async create(fields: {}) {
    const user = new User(fields);
    await user.save();
    return user;
  }

  static async findOne(filterQuery: {} = {}) {
    return User.findOne(filterQuery);
  }
}
