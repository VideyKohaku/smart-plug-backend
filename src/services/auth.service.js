const bcrypt = require('bcrypt');
const { BadRequestError, NotFoundError } = require('../core/error.reponse');
const User = require('../models/user.model');
const { createUserToken } = require('../utils/token');

class AuthService {
  static async register({ name, email, password }) {
    // Check user exists
    const user = await User.findOne({ email }).lean();
    if (user) {
      throw new BadRequestError('Email is already registerd');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: passwordHash });

    const userToken = createUserToken({ name, email });
    return { name, email, token: userToken };
  }

  static async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError('Email does not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestError('Wrong email or password');
    }

    const { name } = user;
    const userToken = createUserToken({ name, email });
    return { name, email, token: userToken }
  }
}

module.exports = AuthService;
