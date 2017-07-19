const Post = require('../../models/Post');

module.exports = {
  newPost: (_, args, {req}) => {
    if (!req.isAuthenticated) {
      return null;
    }
    return Post.createUserPost(req.user, args);
  },
  listPosts: (_, {offset, limit}) => {
    return Post.find({})
    .sort('-createdAt')
    .skip(offset || 0)
    .limit(limit || 20)
    .exec();
  },
  totalPosts: () => {
    return Post.find({}).count().exec();
  }
};
