/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('blogs', table => {
        table.increments('id').primary()
        table.string('date').notNull()
        table.string('title').notNull()
        table.string('subtitle').notNull()
        table.string('imageUrl', 1000)
        table.string('content', 250000).notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('blogs');
};
