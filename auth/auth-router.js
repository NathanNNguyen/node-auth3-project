const router = require('express').Router();  // require express added on the same line
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

// endpoint beginning with /auth
router.post('/register', async (req, res) => {
  let user = req.body;

  // gotta hash the password right before it's going into the db
  user.password = bcrypt.hashSync(user.password, 10);
  try {
    const inserted = await Users.add(user);
    // a jwt has to be generated here 
    const token = generateToken(inserted)
    res.status(201).json({
      user: inserted,
      token
    });
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // get the user by username
    // compare password to allow user to log in
    const user = await Users.findBy({ username })
    if (user && bcrypt.compareSync(password, user.password)) {
      // a jwt has to be generated here 
      const token = generateToken(user)
      res.status(200).json({
        message: `Welcome ${username}!`,
        token
      })
    } else {
      res.status(401).json({ message: `Invalid username or password` })
    }
  }
  catch (error) {
    res.status(500).json(error)
  }
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;