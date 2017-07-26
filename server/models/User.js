const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  auth: {
    local: {
      username: String,
      password: String
    },
    twitter: {
      id: String
    }
  },
  profile: {
    name: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
  }
});

// Custom validation for the auth field.
// At least one of the auth fields must be completed
// in order for the model to be valid.
UserSchema.pre('validate', function(next) {
  const local = this.auth.local.username
                &&
                this.auth.local.password;
  const twitter = !!this.auth.twitter.id;
  if (!local && !twitter) {
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
    if(username.indexOf(' ') !== -1) {
      return reject(new Error('Username cannot contain spaces.'));
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

// Query and attempt to validate a user, given a username/password pair
UserSchema.static('findAndValidate', function(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      return resolve(null);
    }
    const User = mongoose.model('User');
    User.findOne({'auth.local.username': username})
    .then(user => {
      if (user && user.validPassword(password)) {
        return resolve(user);
      }
      return resolve(null);
    })
    .catch(err => {
      reject(err);
    })
  });
});

////////////////////
// Instance Methods
////////////////////

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.auth.local.password);
};

// Return an object of user details suitable for sending to clients
// over the GraphQL endpoint.
UserSchema.methods.sanitize = function() {
  return {
    id: this._id,
    username: this.username()
  };
};

// Return the user's username, either from local or Twitter
// credentials.
UserSchema.methods.username = function() {
  // WIP - For now only return the username, or a placeholder.
  return this.auth.local.username || 'Unknown';
};

UserSchema.methods.likesPost = function({ postId }, req, info) {
  return mongoose.model('Post').findById(postId)
  .then(post => {
    const {path: { prev: { key } } } = info;
    // Only allow this field to be called on a currentUser query.
    if (key !== 'currentUser') {
      return null;
    }
    if (post.likes.find(e => this._id.equals(e))) {
      return true;
    }
    return false;
  })
  .catch(err => false);
};

UserSchema.methods.editProfile = function(name, location, bio) {
  if (name) {
    this.profile.name = name;
  }
  if (location) {
    this.profile.location = location;
  }
  if (bio) {
    this.profile.bio = bio;
  }
  return this.save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
