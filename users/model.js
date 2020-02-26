const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  findBy // use for login
}

function find() {
  return db('users').select('id', 'username', 'department')
};

function findById(id) {
  return db('users').where({ id }).first().select('id', 'username')
};

function add(user) {
  return db('users').insert(user)
    .then(arr => {
      return findById(arr[0])
    })
}

function findBy(query) {
  return db('users').where(query).first()
}
