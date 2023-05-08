const mongoose = require('mongoose'); // Erase if already required
const moment = require('moment-timezone');
const automationUtils = require('../utils/automation.util');

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
          required: true,
          validate: {
            validator: async function (v) {
              const device = await mongoose.model('Device').findById(v);
              return device !== null;
            },
            message: (props) => `${props.value} is not a valid device id!`
          }
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
      default: '12:00',
      validate: {
        validator: (time) => moment(time, 'HH:mm', true).isValid(),
        message: (props) => `${props.value} is not a valid time format!`
      }
    },
    repeats: {
      type: [
        {
          type: Number,
          required: true,
          enum: [1, 2, 3, 4, 5, 6, 7]
        }
      ],
      default: [1]
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

automation.index({ name: 1, user: 1 }, { unique: true });

automation.pre('save', function (next) {
  convertRes = automationUtils.convertFromUserTimezoneToUTC(
    this.time,
    this.repeats
  );
  this.time = convertRes.time;
  this.repeats = convertRes.repeats;

  next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, automation);
