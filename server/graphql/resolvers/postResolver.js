// Resolver for implementing the User type
const Post = require('../../models/Post');

class PostResolver {
  constructor({id}, req) {
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
    return this.user._id;
  }

  type() {
    return this.user.type;
  }

  title() {
    return this.user.title;
  }

  description() {
    return this.user.description;
  }

  image() {
    return this.user.imageLink || null;
  }

  youtubeID() {
    return this.user.youtubeID || null;
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
}

module.exports = PostResolver;
