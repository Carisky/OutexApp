// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: process.env.client,
    connection: {
      host : process.env.host,
      port : process.env.port,
      user : process.env.user,
      password : process.env.password,
      database : process.env.database
    },
    migrations: {
      tableName: process.env.client,
    }
  }

};
