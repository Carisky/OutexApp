/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("repeats", function (table) {
        table.increments("id").primary();
        table.integer("workout_id").unsigned();
        table.integer("exsercise_id").unsigned();
        table.integer("duration").notNullable();
        table.integer("repeats").notNullable();
    
        table.foreign("workout_id").references("workouts.id");
        table.foreign("exsercise_id").references("exsercises.id");
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("repeats");
};
