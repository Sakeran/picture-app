// Resolver for implementing the User type
const User = require('../../models/User');

class UserResolver {
  constructor({id}, req) {
    return new Promise((resolve, reject) => {
      User.findById(id)
      .then(user => {
        if (user) {
          this.user = user;
          return resolve(this);
        }
        resolve(null);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  username() {
    return this.user.auth.local.username || 'No User Name Set';
  }

  // Create a new local user, if possible.
  static newUser({username, password, passwordConfirm}, req) {
    return User.newUser(username, password, passwordConfirm)
    .then(user => {
      const res = user.sanitize();
      return JSON.stringify(res);
    })
    .catch(err => {
      return {
        error: 'Could not create user.',
        reason: err
      };
    });
  }
}

module.exports = UserResolver;
