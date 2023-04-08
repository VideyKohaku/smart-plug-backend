const User = require('../models/user.model');

class UserService {
  static async getUser({ id }) {
    const user = await User.findById(id)
    return user
  }
}

module.exports = UserService
