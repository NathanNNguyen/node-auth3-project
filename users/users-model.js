const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  findBy // use for login
}

function find() {
  return db('users')
};

function findById(id) {
  return db('user').where({ id }).first()
};

function add(user) {
  return db('users').insert(user)

    .then(arr => {
      return findById(arr[0])
    })
};

function findBy(query) {
  return db('users').where(query)
}
