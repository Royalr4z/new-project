/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.dropTable('freeQuote');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.createTable('freeQuote', table => {
        table.increments('id').primary()
        table.string('date').notNull()
        table.string('name').notNull()
        table.string('email').notNull()
        table.string('service').notNull()
        table.string('message', 1000).notNull()
    })
};
