const mongoose = require('mongoose'); // Erase if already required
const User = require('./user.model');
const Device = require('./device.model');

// Declare the Schema of the Mongo model
const MODEL_NAME = 'Scenario';
const COLLECTION_NAME = 'scenarios';
const scenarioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    actions: [
      {
        device: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Device,
        },
        state: Boolean,
      }
    ]
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
// POST name, token, [deviceID, state]

//Export the model
module.exports = mongoose.model(MODEL_NAME, scenarioSchema);
