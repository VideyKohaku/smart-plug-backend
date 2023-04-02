const mongoose = require('mongoose');
const {
  db: { host, name, port, user, password },
} = require('../configs/app.config');

const connectString = `mongodb://${user}:${password}@${host}:${port}/`;

class Database {
  static #instance;

  constructor() {}

  async connect(type = 'mongodb') {
    try {
      await mongoose.connect(connectString, {
        connectTimeoutMS: 3000,
      });
      console.log('DB::connect successfully');
      console.log('DB::' + connectString);
    } catch (err) {
      console.log(`DB::${err.message}`);
    }
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }

    return Database.#instance;
  }
}

module.exports = Database.getInstance();
