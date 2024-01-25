const knexConfig = require('./knexfile');
const Knex = require('knex');

async function createDatabaseIfNotExists() {
    const databaseName = knexConfig.development.connection.database;
  
    const knexInstance = Knex({
      client: knexConfig.development.client,
      connection: {
        host: knexConfig.development.connection.host,
        port: knexConfig.development.connection.port,
        user: knexConfig.development.connection.user,
        password: knexConfig.development.connection.password,
      },
    });
  
    const dbInfo = await knexInstance.raw(`SHOW DATABASES LIKE ?`, [databaseName]);
    const ifDbExist = dbInfo[0].length;
    if (!ifDbExist) {
      await knexInstance.raw(`CREATE DATABASE ??`, [databaseName]);
      console.log(`Database '${databaseName}' created.`);
    } else {
      console.log(`Database '${databaseName}' already exists.`);
    }
  
    // Don't forget to destroy the connection pool when you're done
    await knexInstance.destroy();
  }
  
  // Call the function to create the database if needed
  createDatabaseIfNotExists();