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
  adafruit: {
    topic_prefix: process.env.DEV_ADAFRUIT_TOPIC_PREFIX || 'datdev2409/feeds/'
  }
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
  adafruit: {
    topic_prefix: process.env.PRO_ADAFRUIT_TOPIC_PREFIX || 'datdev2409/feeds/'
  }
};

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
