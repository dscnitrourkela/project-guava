const UserType = require('./user');
const SignType = require('./sign');

module.exports = {
  UserType: new UserType(),
  SignType: new SignType(),
};
