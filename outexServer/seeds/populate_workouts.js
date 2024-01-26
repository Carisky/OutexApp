const fs = require("fs").promises;
const path = require("path");
const csvParse = require("csv-parse/lib/sync");

/**
 * Insert workout data into the database
 * @param { import("knex").Knex } knex
 * @param {string} name
 * @param {string} imageUrl
 */
async function insertWorkout(knex, name, imageUrl, description, info,) {
  try {
    const correctedURL = imageUrl.replace(/\\/g, "/").replace("../", "");
    await knex("workouts").insert({
      name,
      image_url: correctedURL,
      description:description,
      info:info
    });
    console.log(`Inserted data for ${name}`);
  } catch (error) {
    console.error(`Error inserting data for ${name}: ${error.message}`);
  }
}

/**
 * Insert repeat data into the database
 * @param { import("knex").Knex } knex
 * @param {number} workoutId
 * @param {number} exerciseId
 * @param {number} duration
 * @param {number} repeats
 * @param {string} dir
 * @param {string} name
 */
async function insertRepeats(
  knex,
  workoutId,
  exerciseId,
  duration,
  repeats,
  dir,
  name
) {
  try {
    await knex("repeats").insert({
      workout_id: workoutId,
      exsercise_id: exerciseId,
      duration: parseInt(duration, 10),
      repeats: parseInt(repeats, 10),
    });
    console.log(`Inserted data for ${dir} - ${name}`);
  } catch (error) {
    console.error(
      `Error inserting repeat data for ${dir} - ${name}: ${error.message}`
    );
  }
}

/**
 * Read CSV file and return parsed data
 * @param {string} csvFilePath
 * @returns {object[]} Parsed CSV data
 */
async function readCsvFile(csvFilePath) {
  try {
    const csvData = await fs.readFile(csvFilePath, "utf-8");
    return csvParse(csvData, { columns: true });
  } catch (csvError) {
    console.error(`Error reading CSV file ${csvFilePath}: ${csvError.message}`);
    return [];
  }
}

/**
 * Seed function
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const initPath = "../public/uploads/Trainings";
  const trainingsPath = path.join(__dirname, initPath);

  try {
    const trainingsDirs = await fs.readdir(trainingsPath);

    for (const dir of trainingsDirs) {
      const filesDirPath = path.join(trainingsPath, dir);
      const files = await fs.readdir(filesDirPath);

      const jpgFile = files.find((file) => file.toLowerCase().endsWith(".jpg"));
      const relationsFile = files.find((file) =>
        file.toLowerCase().endsWith("relations.csv")
      );
      const descriptionFile = files.find((file) =>
        file.toLowerCase().endsWith("description.csv")
      );
      
      const descriptionFilePath = path.join(filesDirPath, descriptionFile);
      const parsedSescriptionFile = (await readCsvFile(descriptionFilePath))[0];
      
      const { Info, Description } = parsedSescriptionFile;

      await insertWorkout(knex, dir, path.join(initPath, dir, jpgFile), Info, Description);

      if (relationsFile) {
        const relationsFilePath = path.join(filesDirPath, relationsFile);
        const parsedrelationsFile = await readCsvFile(relationsFilePath);

        for (const csvRow of parsedrelationsFile) {
          const { Name, Duration, Repeats } = csvRow;

          const workoutId = await knex("workouts")
            .where("name", dir)
            .select("id")
            .first();
          const exerciseId = await knex("exsercises")
            .where("name", Name)
            .select("id")
            .first();

          if (workoutId && exerciseId) {
            await insertRepeats(
              knex,
              workoutId.id,
              exerciseId.id,
              Duration,
              Repeats,
              dir,
              Name
            );
          } else {
            console.error(
              `Skipping insertion for ${dir} - ${Name}. Workout or Exercise not found.`
            );
          }
        }
      }
      console.log("\n");
    }
  } catch (err) {
    console.error(err);
  }
};
