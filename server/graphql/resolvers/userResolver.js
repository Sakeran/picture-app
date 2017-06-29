// Resolver for implementing the User type
const User = require('../../models/User');

class UserResolver {
  constructor({id}, req) {
    return new Promise((resolve, reject) => {
      User.findById(id)
      .then(user => {
        this.user = user;
        resolve(this);
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
  static newUser({username, password}, req) {
    return new Promise((resolve, reject) => {
      User.findOne({'auth.local.username': username})
      .then(user => {
        if (user) {
          return resolve(false);
        }
        const createdUser = new User();
        createdUser.auth.local.username = username;
        createdUser.auth.local.password = createdUser.generateHash(password);
        createdUser.save()
        .then(user => {
          return resolve(true);
        })
        .catch(err => {
          return reject();
        });
      })
      .catch(err => {
        return reject();
      });
    })
  }
}

module.exports = UserResolver;
