const mongoose = require('mongoose');

const MODEL_NAME = 'Device';
const COLLECTION_NAME = 'devices';
const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    state: {
      type: Boolean,
      required: true,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    topic: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

deviceSchema.index({ name: 1, user: 1 }, { unique: true });

//Export the model
const Device = mongoose.model(MODEL_NAME, deviceSchema);
module.exports = Device;
