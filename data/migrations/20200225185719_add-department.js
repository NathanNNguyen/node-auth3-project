
exports.up = function (knex) {
  return knex.schema.table('users', tbl => {
    tbl.string('department').defaultTo('user')
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', tbl => {
    tbl.dropColumn('department');
  })
};
