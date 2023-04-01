const { ForbiddenError } = require("../core/error.reponse")
const { decryptUserToken } = require("../utils/token.util")

function protect(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new ForbiddenError("No token found")
  }

  const authToken = authHeader.split(' ')[1]
  try {
    const user = decryptUserToken(authToken)
    req.user = user
    next()
  }
  catch (error) {
    console.log(error)
    throw new ForbiddenError("Invalid token") 
  }
}

module.exports = protect
