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

// Create a new user model with local credentials if possible.
UserSchema.static('newUser', function (username, password, passwordConfirm) {
  return new Promise((resolve, reject) => {
    if (!password || password.length < 6) {
      return reject(new Error('Password must be at least 6 characters long.'));
    }
    if (password !== passwordConfirm) {
      return reject(new Error('Password must match the password confirmation.'));
    }
    if(!username) {
      return reject(new Error('Username cannot be blank.'));
    }
    const User = mongoose.model('User');
    User.findOne({'auth.local.username': username})
    .then(user => {
      if (user) {
        return reject(new Error('Username taken.'));
      }
      const newUser = new User();
      newUser.auth.local.username = username;
      newUser.auth.local.password = newUser.generateHash(password);
      newUser.save()
      .then(user => {
        return resolve(user);
      })
      .catch(err => {
        return reject(err);
      });
    })
    .catch(err => {
      reject(err);
    })
  });
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
