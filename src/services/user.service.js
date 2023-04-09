const User = require('../models/user.model');
const pickFields = require('../utils/pickFields');

class UserService {
  static async _format(obj) {
    const fields = ['name', '_id'];
    return pickFields(obj, fields);
  }

  static async _formatList(users) {
    const newList = users.map((user) => UserService._format(user));
    return newList;
  }

  static async getUser({ id }) {
    const user = await User.findById(id);
    return UserService._format(user);
  }

  static async getAllUsers() {
    const users = await User.find({});
    return UserService._formatList(users);
  }
}

module.exports = UserService;
