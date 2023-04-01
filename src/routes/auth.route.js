const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const AuthController = require('../controllers/auth.controller');
const protect = require('../middlewares/protect');
const router = express.Router();

router.get('/test', protect, (req, res) => {
  res.json('TOKEN VALID');
});
router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));

module.exports = router;
