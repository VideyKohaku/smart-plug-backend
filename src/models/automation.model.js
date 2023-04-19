const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'automations';
const DOCUMENT_NAME = 'Automation';

const automation = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
          default: false
        }
      }
    ],
    time: {
      type: String,
      required: true,
      default: '12:00'
    },
    repeats: {
      type: [
        {
          type: Number,
          required: true,
          enum: [1, 2, 3, 4, 5, 6, 7]
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

automation.index({ name: 1, user: 1 }, { unique: true });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, automation);
