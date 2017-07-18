const User = require('../../models/User');

const resolvers = {
  Query: {
    currentUser: (_, args, { req }) => req.user || null,
    user: (_, { id }) => User.findById(id)
  },
  Mutation: {
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
    }
  }
}

module.exports = resolvers;
