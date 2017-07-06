// Root resolver for the application's GraphQL endpoint.

const UserResolver = require('./userResolver');

module.exports = {
  user: (args, req) => new UserResolver(args, req),
  signup: (args, req) => UserResolver.signup(args, req)
};
