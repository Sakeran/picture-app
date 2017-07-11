// Resolver for implementing the User type
const Post = require('../../models/Post');
const ObjectId = require('mongoose').Types.ObjectId;

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

  type() {
    return this.post.type;
  }

  title() {
    return this.post.title;
  }

  description() {
    return this.post.description;
  }

  image() {
    return this.post.imageLink || null;
  }

  youtubeID() {
    return this.post.youtubeID || null;
  }

  ////////////////////
  // Static Methods
  ////////////////////

  static newPost({title, type, data, description}, req) {
    if (!req.isAuthenticated()) {
      return false;
    }
    if (type !== 'image') {
      console.warn('Youtube posts not yet supported');
      return false;
    }
    const postField = type === 'image' ? 'imageLink' : 'youtubeID';
    const postData = {
      postType: type,
      title,
      description
    };
    postData[postField] = data;
    return Post.createUserPost(req.user, postData)
    .then(() => true)
    .catch(err => console.error(err), false);
  }

  static getPosts({offset, limit, userID}, req) {
    console.log('POSTS!');
    // Limit posts to 20 by default.
    limit = limit || 20;
    // Offset is 0 by default.
    offset = offset || 0;
    // If a userID is provided, pass that into the query.
    const query = {};
    if (userID) {
      query['createdBy'] = new ObjectId(userID);
    }
    console.log(query);
    return Post.find(query)
    .skip(offset)
    .limit(limit)
    .then(posts => {
      console.log(posts);
      return posts.map(e => new PostResolver({post: e}));
    })
    .catch(err => console.err, null);
  }
}

module.exports = PostResolver;
