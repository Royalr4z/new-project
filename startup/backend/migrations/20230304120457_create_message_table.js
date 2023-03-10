/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('message', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull()
        table.string('content', 1000).notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('message');
};
