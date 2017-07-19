const User = require('../../models/User');

module.exports = {
  login: (_, {username, password}, {req}) => {
    if (req.isAuthenticated()) {
      return null;
    }
    return new Promise((resolve, reject) => {
      User.findAndValidate(username, password)
      .then(user => {
        if (!user) {
          return resolve(null);
        }
        req.login(user, err => {
          if (err) {
            return reject(err);
          }
          return resolve(user);
        });
      })
      .catch(err => { throw err });
    });
  },
  logout: (_, args, {req}) => {
    req.logout();
    return true;
  },
  signup: (_, {username, password, passwordConfirm}, {req}) => {
    return new Promise((resolve, reject) => {
      User.newUser(username, password, passwordConfirm)
      .then(user => {
        req.login(user, err => {
          if (err) {
            return reject(err);
          }
          return resolve(user);
        });
      })
      .catch(err => reject(err));
    });
  }
}
