const mongoose = require('mongoose'); // Erase if already required
const configs = require('../configs/app.config');

// Declare the Schema of the Mongo model
const MODEL_NAME = 'Sensor';
const COLLECTION_NAME = 'sensors';
const sensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    type_sensor: {
      type: String,
      require: true,
      default: 'unknown'
    },
    value: {
      type: String,
      default: '0'
    },
    topic: {
      type: String,
      required: true,
      unique: true,
      get: (t) => t.toLowerCase().replace('.', '-dot-')
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

//Export the model
const Sensor = mongoose.model(MODEL_NAME, sensorSchema);
module.exports = Sensor;
