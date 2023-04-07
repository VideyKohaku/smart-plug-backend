const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27018,
    name: process.env.DEV_DB_NAME || 'test',
    user: process.env.DEV_DB_USER || 'root',
    password: process.env.DEV_DB_PASSWORD || 'password',
  },
  jwt: {
    secret_key: process.env.DEV_JWT_SECRET_KEY || 'secret_key',
    expires_in: process.env.DEV_JWT_EXPIRES_IN || '7d',
  },
  adafruit: {
    username: process.env.DEV_ADAFRUIT_USERNAME || 'datdev2409',
    api_key:
      process.env.DEV_ADAFRUIT_API_KEY || 'aio_MHZG09ksufVFAhWCz5E0nV4Iznyh',
    topic_prefix: process.env.DEV_ADAFRUIT_TOPIC_PREFIX || 'datdev2409/feeds/',
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3052,
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27018,
    name: process.env.PRO_DB_NAME || 'test',
    user: process.env.PRO_DB_USER || 'root',
    password: process.env.PRO_DB_PASSWORD || 'password',
  },
  jwt: {
    secret_key: process.env.PRO_JWT_SECRET_KEY || 'secret_key',
    expires_in: process.env.PRO_JWT_EXPIRES_IN || '7d',
  },
  adafruit: {
    username: process.env.PRO_ADAFRUIT_USERNAME || 'datdev2409',
    api_key:
      process.env.PRO_ADAFRUIT_API_KEY || 'aio_MHZG09ksufVFAhWCz5E0nV4Iznyh',
    topic_prefix: process.env.PRO_ADAFRUIT_TOPIC_PREFIX || 'datdev2409/feeds/',
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
