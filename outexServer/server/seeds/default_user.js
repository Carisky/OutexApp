/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Insert a default user
  await knex('users').insert({
    email: 'root',
    birthdate: '2000-01-01',  // Set a default birthdate
    password: 'root',  // Replace with a hashed password
    username: 'root',
    description: 'Default user description',
    // profileImage: ...,  // You can insert a binary image data here if needed
    created_at: new Date(),
    updated_at: new Date(),
  });
};
};
