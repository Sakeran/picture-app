// Root resolver for the application's GraphQL endpoint.

const UserResolver = require('./userResolver');
const PostResolver = require('./postResolver');

module.exports = {
  currentUser: (args, req) => new UserResolver({current: true}, req),
  user: (args, req) => new UserResolver(args, req),
  signup: (args, req) => UserResolver.signup(args, req),
  login: (args, req) => UserResolver.login(args, req),
  logout: (args, req) => UserResolver.logout(args, req),
  post: (args, req) => new PostResolver(args, req),
  posts: (args, req) => PostResolver.getPosts(args, req),
  createPost: (args, req) => PostResolver.newPost(args, req)
};
