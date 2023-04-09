const User = require('../src/models/user.model')
const Device = require('../src/models/device.model');
const Scenario = require('../src/models/scenario.model')
const Automation = require('../src/models/automation.model')
const db = require('../src/database/db.init');
db.connect()

async function clearDB() {
  await User.deleteMany({})
  await Device.deleteMany({})
  await Scenario.deleteMany({})
  await Automation.deleteMany({})
  console.log("DB::cleared all")
  db.exit()
}

clearDB()
