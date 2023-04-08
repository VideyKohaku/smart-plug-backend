const mongoose = require('mongoose');
const adafruitService = require('../services/adafruit.service');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('group').get(function () {
  const groupName = this.email.split('@')[0];
  return groupName;
});

//Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
