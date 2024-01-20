/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.date('birthdate').nullable();
      table.string('password').notNullable();
      table.string('username').notNullable();
      table.string('description').nullable();
      table.mediumtext('profileImage'); // Add a BLOB column for storing images
      // Add other columns as needed
      table.timestamps(true, true);
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
