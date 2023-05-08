const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

require('./services/adafruit.service');
// middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const db = require('./database/db.init');
const { scheduleAllAutomations } = require('./services/automation.service');

(async function () {
  await db.connect();

  // schedule all automations
  scheduleAllAutomations();
})();

// routes
app.use('/', require('./routes'));

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV == 'dev') {
    console.log(error);
  }
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || 'Internal Server Error',
    code: statusCode,
    status: 'error'
  });
});

module.exports = app;
