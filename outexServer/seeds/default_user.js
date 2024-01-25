/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Insert a default user
  try {
    await knex('users').insert({
      email: 'email',
      password: 'password',  // Replace with a hashed password
      username: 'user',
      description: 'Default user description',
      profileImage: null,
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    console.error(error);
  }
};
