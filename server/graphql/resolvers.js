const User = require('../models/User');
const Post = require('../models/Post');
const {
  login,
  logout,
  signup,
  editProfile,
} = require('./resolvers/userResolvers');
const {
  totalPosts,
  listPosts,
  newPost,
  likePost,
  unlikePost,
  addComment,
  comments,
  deletePost,
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
    editProfile,
    newPost,
    likePost,
    unlikePost,
    addComment,
    deletePost,
  }
}

module.exports = resolvers;
