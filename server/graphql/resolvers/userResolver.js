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
  static signup({username, password, passwordConfirm}, req) {
    return new Promise((resolve, reject) => {
      User.newUser(username, password, passwordConfirm)
      .then(user => {
        req.login(user, err => {
          if (err) {
            return resolve({
              error: 'Could not login user.',
              reason: err
            });
          }
          resolve(user.sanitize());
        });
      })
      .catch(err => {
        resolve({
          error: 'Could not create user.',
          reason: err
        });
      });
    })
    .then(data => JSON.stringify(data));
  }
}

module.exports = UserResolver;
