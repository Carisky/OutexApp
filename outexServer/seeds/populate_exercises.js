// seeders/20220119130000_populate_exercises.js
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/lib/sync');

exports.seed = async function(knex) {
  const exercisesPath = path.join(__dirname, '../public/uploads/Exercises');

  // Функция для получения данных из CSV файла
  const readCsvFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return csvParse(content, { columns: false });
  };

  // Заполнение таблицы exercises
  const exerciseFiles = fs.readdirSync(exercisesPath);
  for (const exerciseFile of exerciseFiles) {
    const exerciseFolderPath = path.join(exercisesPath, exerciseFile);


    const exerciseCsvPath = path.join(exerciseFolderPath, exerciseFile + '.csv');
    const exerciseNNDataPath = path.join(exerciseFolderPath, exerciseFile + 'NN.csv');
    const exerciseVideoPath = path.join(exerciseFolderPath, exerciseFile + '.mp4');


    const exerciseData = readCsvFile(exerciseCsvPath);
    const exerciseNNData = readCsvFile(exerciseNNDataPath);
    const relativeVideoPath = path.relative(__dirname, exerciseVideoPath).replace("..\\", '');
    const correctedVideoURL = relativeVideoPath.replace(/\\/g, '/');
    console.log(correctedVideoURL);

    try {
      // Use await to wait for the insertion to complete
      await knex('exsercises').insert({
        name: exerciseFile,
        video_url: correctedVideoURL,
      });
      console.log(`Inserted data for ${exerciseFile}`);
    } catch (error) {
      console.error(`Error inserting data for ${exerciseFile}: ${error.message}`);
    }
  }
};
