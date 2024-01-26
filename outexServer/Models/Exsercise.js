const { Model } = require('objection');

class Exsercise extends Model {
  static get tableName() {
    return 'exsercises';
  }
}

module.exports = Exsercise;
