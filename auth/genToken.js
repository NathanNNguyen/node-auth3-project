const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department  // when adding this step, must generate a new token
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken;