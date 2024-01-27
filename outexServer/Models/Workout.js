const { Model } = require('objection');
const Repeat = require('./Repeat');
 // Adjust the path based on your project structure

class Workout extends Model {
  static get tableName() {
    return 'workouts';
  }

  static get relationMappings() {
    return {
      repeats: {
        relation: Model.HasManyRelation,
        modelClass: Repeat,
        join: {
          from: 'workouts.id',
          to: 'repeats.workout_id'
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
      .withGraphFetched('repeats.exercise');
    return workout;
  }
}

module.exports = Workout;
