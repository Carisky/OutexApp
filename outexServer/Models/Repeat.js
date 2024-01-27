const Exsercise = require('./Exsercise');
const { Model } = require('objection');
class Repeat extends Model {
    static get tableName() {
      return 'repeats';
    }
  
    static get relationMappings() {
      return {
        exercise: {
          relation: Model.BelongsToOneRelation,
          modelClass: Exsercise,
          join: {
            from: 'repeats.exsercise_id',
            to: 'exsercises.id'
          }
        }
      };
    }
  }
  
  module.exports = Repeat;
  