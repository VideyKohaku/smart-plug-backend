const express = require('express')
const router = express.Router()

router.use('/api/auth', require('./auth.route'));
router.use("/api/users", require('./user.route'));
router.use('/api/devices', require('./device.route'));
router.use('/api/sensors', require('./sensor.route'));
router.use('/api/scenarios', require('./scenario.route'));
router.use('/api/automations', require('./automation.route'))

router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to SmartPlug' });
});


module.exports = router
