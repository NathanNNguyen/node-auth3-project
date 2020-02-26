const express = require('express');

const db = require('./users-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.find();
    res.json(users);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;