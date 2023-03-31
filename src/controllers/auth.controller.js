const { CREATED, DELETED } = require('../core/success.response');
const AuthService = require('../services/auth.service');

class AuthController {
  static async register(req, res) {
    new CREATED({
      message: 'Register successfully',
      metadata: await AuthService.register(req.body),
    }).send(res);
  }

  static login(req, res) {
  }
}

module.exports = AuthController;
