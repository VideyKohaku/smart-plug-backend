const mongoose = require('mongoose'); // Erase if already required
const configs = require('../configs/app.config');
// Declare the Schema of the Mongo model

const MODEL_NAME = 'Device';
const COLLECTION_NAME = 'devices';
const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    state: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

deviceSchema.virtual('topic').get(function () {
  return configs.adafruit.topic_prefix + this.user + this.name;
});

//Export the model
module.exports = mongoose.model(MODEL_NAME, deviceSchema);
