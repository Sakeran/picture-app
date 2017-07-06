// Root resolver for the application's GraphQL endpoint.

const UserResolver = require('./userResolver');

module.exports = {
  currentUser: (args, req) => new UserResolver(Object.assign(args, {current: true}), req),
  user: (args, req) => new UserResolver(args, req),
  signup: (args, req) => UserResolver.signup(args, req)
};
