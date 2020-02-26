const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');

function restricted(req, res, next) {
  const token = req.headers.authorization;
  // see if there is a token
  // check the token if valid
  // rehash the header + payload + secret to match verify signature
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Failed to verify', error })
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No token provided' })
  }
}

module.exports = restricted;