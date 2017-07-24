const User = require('../models/User');
const Post = require('../models/Post');
const {
  login,
  logout,
  signup,
} = require('./resolvers/userResolvers');
const {
  totalPosts,
  listPosts,
  newPost,
  likePost,
  unlikePost,
  addComment,
  comments,
} = require('./resolvers/postResolvers')

const resolvers = {
  Query: {
    currentUser: (_, args, { req }) => req.user || null,
    user: (_, { id }) => User.findById(id),
    post: (_, { id }) => Post.findById(id),
    listPosts,
    totalPosts,
    comments,
  },
  Mutation: {
    login,
    logout,
    signup,
    newPost,
    likePost,
    unlikePost,
    addComment,
  }
}

module.exports = resolvers;
