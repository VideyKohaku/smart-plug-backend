const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const db = require('./database/db.init');
db.connect();

// routes
app.use('/api/auth', require('./routes/auth.route'));

app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to SmartPlug' });
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || 'Internal Server Error',
    code: statusCode,
    status: 'error',
  });
});

module.exports = app;
