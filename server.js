const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const authController = require('./controllers/authController');
app.use(authController.decodeToken);
app.get('/test-firebase-auth-intg', (req, res) => {
  res.status(200).json({ status: 'success', data: 'Hello World' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
