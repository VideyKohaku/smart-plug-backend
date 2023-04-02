const JWT = require('jsonwebtoken');
const { jwt } = require('../configs/app.config');

function createUserToken(userInfo) {
  return JWT.sign(userInfo, jwt.secret_key, {
    expiresIn: jwt.expires_in,
  });
}

function decryptUserToken(token) {
  return JWT.verify(token, jwt.secret_key);
}

module.exports = { createUserToken, decryptUserToken };
