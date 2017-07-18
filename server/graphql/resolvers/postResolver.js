// Resolver for implementing the User type
const Post = require('../../models/Post');
const ObjectId = require('mongoose').Types.ObjectId;

const youtubeRegex = require('youtube-regex');
const getYoutubeId = require('get-youtube-id');

const UserResolver = require('./userResolver');

class PostResolver {
  constructor({id, post}, req) {
    if (post) {
      this.post = post;
      return this;
    }
    return new Promise((resolve, reject) => {
      Post.findById(id)
      .then(post => {
        if (post) {
          this.post = post;
          return resolve(this);
        }
        resolve(null);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  id() {
    return this.post.id;
  }

  creatorName() {
      return 'Some guy';
  }

  type() {
    return this.post.postType;
  }

  title() {
    return this.post.title;
  }

  description() {
    return this.post.description || 'No Description';
  }

  image() {
    return this.post.getImage();
  }

  youtubeID() {
    return this.post.youtubeID || null;
  }

  ////////////////////
  // Static Methods
  ////////////////////

  static newPost({title, link, description}, req) {
    if (!req.isAuthenticated()) {
      return false;
    }
    const postData = {
      title,
      description
    };
    if(!youtubeRegex().test(link)) {
      // Link should be a regular image.
      postData.postType = 'image';
      postData.imageLink = link;
    } else {
      // Link should be to a Youtube video.
      const id = getYoutubeId(link);
      if(!id) {
        return false;
      }
      postData.postType = 'youtube';
      postData.youtubeID = id;
    }
    return Post.createUserPost(req.user, postData)
    .then(() => true)
    .catch(err => console.error(err), false);
  }

  static getPosts({offset, limit, userID}, req) {
    // Limit posts to 20 by default.
    limit = limit || 20;
    // Offset is 0 by default.
    offset = offset || 0;
    // If a userID is provided, pass that into the query.
    const query = {};
    if (userID) {
      query['createdBy'] = new ObjectId(userID);
    }
    return Post.find(query)
    .sort('-createdAt')
    .skip(offset)
    .limit(limit)
    .then(posts => {
      return posts.map(e => new PostResolver({post: e}));
    })
    .catch(err => console.err, null);
  }
}

module.exports = PostResolver;
