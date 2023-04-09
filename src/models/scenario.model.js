const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'scenarios';
const DOCUMENT_NAME = 'Scenario';

const scenarioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    actions: [
      {
        device: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Device',
          required: true
        },
        state: {
          type: Boolean,
          default: false,
        },
      },
    ],
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, scenarioSchema);
