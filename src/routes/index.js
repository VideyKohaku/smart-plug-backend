const express = require('express')
const router = express.Router()

router.use('/api/auth', require('./auth.route'));
router.use('/api/devices', require('./device.route'));

router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to SmartPlug' });
});


module.exports = router
