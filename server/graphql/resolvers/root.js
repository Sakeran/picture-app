// Root resolver for the application's GraphQL endpoint.

const UserResolver = require('./userResolver');

module.exports = {
  currentUser: (args, req) => new UserResolver({current: true}, req),
  user: (args, req) => new UserResolver(args, req),
  signup: (args, req) => UserResolver.signup(args, req),
  login: (args, req) => UserResolver.login(args, req),
  logout: (args, req) => UserResolver.logout(args, req)
};
