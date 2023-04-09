const bcrypt = require('bcrypt');
const { BadRequestError, NotFoundError } = require('../core/error.reponse');
const User = require('../models/user.model');
const { createUserToken } = require('../utils/token.util');
const adafruitService = require('./adafruit.service');

class AuthService {
  static async register({ name, email, password }) {
    // Check user exists
    const user = await User.findOne({ email }).lean();
    if (user) {
      throw new BadRequestError('Email is already registerd');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: passwordHash });

    // Create user group in adafruit
    await adafruitService.createGroup(newUser.group)

    const userToken = createUserToken({ id: newUser.id, name, email });
    return { id: newUser.id, name, email, token: userToken };
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

    const { name, id, group } = user;
    const userToken = createUserToken({ id, name, email });
    return { id, name, email, token: userToken, group };
  }
}

module.exports = AuthService;
