const { Schema, Model, trusted } = require('mongoose');

const COLLECTION_NAME = 'constraints';
const DOCUMENT_NAME = 'Constraint';

const valueConstraintSchema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    refPath: 'docModel',
  },
  docModel: {
    type: String,
    required: true,
    enum: ['Sensor', 'Device'],
  },
  comparator: {
    type: String,
    required: true,
    enum: ['<', '>', '<=', '>=', '='],
  },
  value: {
    type: String,
    required: true,
  },
});

const timeConstraintSchema = new Schema({
  // time is stored in 24 hour format
  time: {
    type: String,
    required: true,
    default: '12:00',
  },
  repeats: {
    type: [
      {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
    default: [],
  },
});

module.exports = Model(DOCUMENT_NAME, constraintSchema);
