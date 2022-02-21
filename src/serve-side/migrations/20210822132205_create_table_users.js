
exports.up = function(knex, Promise) {
  return knex.schema.createTable('userss',table =>{
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('username').notNull()
    table.string('email').unique().notNull()
    table.string('password').notNull()
    table.integer('company_id').references('id').inTable('company')

  })
};

exports.down = function(knex) {
  
};
