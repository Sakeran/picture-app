const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  auth: {
    local: {
      username: String,
      password: String
    }
  }
});

// Custom validation for the auth field.
// At least one of the auth fields must be completed
// in order for the model to be valid.
UserSchema.pre('validate', function(next) {
  const local = this.auth.local.username
                &&
                this.auth.local.password;
  if (!local) {
    this.invalidate('auth', 'At least one auth field must be completed.');
  }
  next();
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;