const mongoose = require('mongoose'); // Erase if already required
const User = require('./user.model');

// Declare the Schema of the Mongo model
const scenarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  user: {
    type: ID,
    ref: User,
    required: true,
  },
  actions: [
    {
      device: {type: ID, ref: Device},
      state: Boolean
    }
  ]
});
// POST name, token, [deviceID, state]

//Export the model
module.exports = mongoose.model('User', userSchema);
