const express = require('express');

const db = require('./model.js');
const restricted = require('../auth/resticted.js');

const router = express.Router();

router.get('/', restricted, async (req, res) => {
  console.log('decoded token', req.decodedToken) // try this step to see the decodedToken
  const { department, sub } = req.decodedToken;
  try {
    const users = await db.find();
    if (department === 'admin') {
      res.json(users);
    } else {
      const user = await db.findById(sub)
      res.json(user);
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;