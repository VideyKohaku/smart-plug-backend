const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const MODEL_NAME = 'Sensor';
const COLLECTION_NAME = 'sensors';
const sensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'analog',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

//Export the model
module.exports = mongoose.model(MODEL_NAME, sensorSchema);
