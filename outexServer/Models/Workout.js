const { Model } = require('objection');
const Exsercise = require('./Exsercise'); // Adjust the path based on your project structure

class Workout extends Model {
  static get tableName() {
    return 'workouts';
  }

  static get relationMappings() {
    return {
      exsercises: {
        relation: Model.ManyToManyRelation,
        modelClass: Exsercise,
        join: {
          from: 'workouts.id',
          through: {
            from: 'repeats.workout_id',
            to: 'repeats.exsercise_id'
          },
          to: 'exsercises.id'
        }
      }
    };
  }

  static async returnAll() {
    const workouts = await this.query().select('*');
    return workouts;
  }

  static async returnWorkoutWithExercises(id) {
    const workout = await this.query()
      .findById(id)
      .withGraphFetched('exsercises');
    return workout;
  }
}

module.exports = Workout;
