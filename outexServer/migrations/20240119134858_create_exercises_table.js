/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("exercises", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("duration");
    table.integer("repetitions");
    table.string("video_url");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("exercises");
};
