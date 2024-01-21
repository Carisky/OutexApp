const { Model } = require('objection');

class Workout extends Model {
  static get tableName() {
    return 'workouts';
  }
  static async returnAll() {
    const workouts = await this.query().select('*');
    return workouts;
  }
}
module.exports = Workout;