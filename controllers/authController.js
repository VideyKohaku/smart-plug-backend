const admin = require('../config/firebase-config');

exports.decodeToken = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization)
    return res.status(401).json({ message: 'Unauthorized!' });

  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (decodedValue) {
      console.log(decodedValue);
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized!' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error!' });
  }
};
