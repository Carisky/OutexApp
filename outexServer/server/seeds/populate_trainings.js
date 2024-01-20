const fs = require('fs').promises; // Using promises version for async operations
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  const initPath = '../public/uploads/Trainings'

  const trainingsPath = path.join(__dirname, initPath);

  try {
    const trainingsDirs = await fs.readdir(trainingsPath);

    for (const Dir of trainingsDirs) {
      const filesDirPath = path.join(trainingsPath, Dir);
      const files = await fs.readdir(filesDirPath);

      // Filter only .jpg files
      const jpgFiles = files
        .filter(file => file.toLowerCase().endsWith('.jpg'))
        .map(jpgFile => path.join(filesDirPath, jpgFile));
      
      console.log(jpgFiles);

      try {
        // Use await to wait for the insertion to complete
        await knex('trainings').insert({
          name: Dir,
          image_url: jpgFiles[0],
        });
        console.log(`Inserted data for ${Dir}`);
      } catch (error) {
        console.error(`Error inserting data for ${Dir}: ${error.message}`);
      }

    }
  } catch (err) {
    console.error(err);
  }
};
