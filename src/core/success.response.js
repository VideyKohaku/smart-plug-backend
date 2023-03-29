const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class SuccessReponse {
  constructor(message, statusCode, reasonStatusCode, metadata) {
    this.message = message ? message : reasonStatusCode;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    res.status(this.statusCode).json({
      message: this.message,
      code: this.statusCode,
      metadata: this.metadata,
    });
  }
}

class OK extends SuccessReponse {
  constructor({ message, metadata }) {
    super(message, StatusCodes.OK, ReasonPhrases.OK, metadata);
  }
}

class CREATED extends SuccessReponse {
  constructor({ message, metadata }) {
    super(message, StatusCodes.CREATED, ReasonPhrases.CREATED, metadata);
  }
}

module.exports = {
  OK,
  CREATED,
};
