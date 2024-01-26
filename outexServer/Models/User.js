// models/User.js
const { Model } = require('objection');
const format = require('format');

class User extends Model {
  static get tableName() {
    return 'users';
  }
  static async ifExist(email) {
    const existingUser = this.query().select('*').where('email', email).first();
    return !existingUser; // Return true if the user exists, false otherwise
  }
  static async findByEmail(email) {
    const user = await this.query().select('*').where('email', email).first(); // Use 'this.query()' instead of 'knex'
    return user;
  }
  static async updateUserData(id, username, description, birthdate, profileImage) {

    if(profileImage!==null){
      await this.query().where('id', id).update({
        username,
        description,
        birthdate: birthdate,
        profileImage,
      });
    }else{
      await this.query().where('id', id).update({
        username,
        description,
        birthdate: birthdate,
      });
    }
    
  }
}

module.exports = User;
