const fs = require('fs').promises; // Using promises version for async operations
const path = require('path');
const csvParse = require('csv-parse/lib/sync');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  const initPath = '../public/uploads/Trainings'

  const trainingsPath = path.join(__dirname, initPath);
  const publicPath = path.join(__dirname, '../public'); // Get the absolute path to the public directory

  try {
    const trainingsDirs = await fs.readdir(trainingsPath);

    for (const Dir of trainingsDirs) {
      const filesDirPath = path.join(trainingsPath, Dir);
      const files = await fs.readdir(filesDirPath);
    
      const jpgFile = files.find(file => file.toLowerCase().endsWith('.jpg'));
      const csvFile = files.find(file => file.toLowerCase().endsWith('relations.csv'));
    
      try {
        const relativeImagePath = path.relative(publicPath, jpgFile);
        const imagePathWithPublic = path.join('public', relativeImagePath);
        const correctedURL = imagePathWithPublic.replace(/\\/g, '/');
        await knex('workouts').insert({
          name: Dir,
          image_url: correctedURL,
        });
        console.log(`Inserted data for ${Dir}`);
      } catch (error) {
        console.error(`Error inserting data for ${Dir}: ${error.message}`);
      }
    
      if (csvFile) {
        const csvFilePath = path.join(filesDirPath, csvFile);
        try {
          const csvData = await fs.readFile(csvFilePath, 'utf-8');
          const parsedCsv = csvParse(csvData, { columns: true });
    
          for (const csvRow of parsedCsv) {
            const { Name, Duration, Repeats } = csvRow;
    
            // Find the corresponding workout and exercise IDs
            const workoutId = await knex('workouts').where('name', Dir).select('id').first();
            const exerciseId = await knex('exsercises').where('name', Name).select('id').first();
            console.log(workoutId)
            console.log(Name);
            console.log(exerciseId)
            // Check if workoutId and exerciseId are defined before accessing their id properties
            if (workoutId && exerciseId) {
              await knex('repeats').insert({
                workout_id: workoutId.id,
                exsercise_id: exerciseId.id,
                duration: parseInt(Duration, 10),
                repeats: parseInt(Repeats, 10),
              });
              console.log(`Inserted data for ${Dir} - ${Name}`);
            } else {
              console.error(`Skipping insertion for ${Dir} - ${Name}. Workout or Exercise not found.`);
            }
          }
        } catch (csvError) {
          console.error(`Error reading CSV file ${csvFile}: ${csvError.message}`);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }

  

};
