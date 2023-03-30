const bcrypt = require('bcrypt');
const { BadRequestError } = require('../core/error.reponse');
const User = require('../models/user.model');

class AuthService {
  static async register({name, email, password}) {
    // Check user exists
    const user = await User.findOne({ email }).lean();
    if (user) {
      throw new BadRequestError('Email is already registerd');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: passwordHash });
    return newUser
    // res.json({ message: 'Register Route' });
  }

  static login(req, res) {
    res.json({ message: 'Login route' });
  }
}

module.exports = AuthService;
