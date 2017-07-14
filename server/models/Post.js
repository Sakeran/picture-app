const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postType: {
    type: String,
    enum: ['image', 'youtube'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  youtubeID: String,
  imageLink: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Custom validation
postSchema.pre('validate', function(next) {

  if (this.postType === 'image' && !this.hasValidImageLink()) {
    this.invalidate('imageLink', 'Invalid image link');
  }

  if (this.postType === 'youtube' && !this.hasValidYoutubeID()) {
    this.invalidate('youtubeID', 'Invalid youtube id');
  }

  next();
});

postSchema.methods.hasValidImageLink = function() {
  if (!this.imageLink) { return false; }
  const urlMatcher = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if(!urlMatcher.test(this.imageLink)) { return false; }

  return true;
};

postSchema.methods.hasValidYoutubeID = function() {
  if (!this.youtubeID) { return false; }
  const idMatcher = /[a-zA-Z0-9_-]{11}/;
  return idMatcher.test(this.youtubeID);
};

postSchema.methods.getImage = function() {
  if (this.postType === 'image') {
    return this.imageLink;
  }
  if (this.postType === 'youtube') {
    return `http://img.youtube.com/vi/${this.youtubeID}/maxresdefault.jpg`;
  }
  console.error(`Post ID ${this.id} could not produce a display image.`);
  return null;
};

///////////////////
// Static Methods
///////////////////

postSchema.static('createUserPost', function(user, options) {
  return new Promise((resolve, reject) => {
    if (!user || user.constructor.modelName !== 'User') {
      return reject(new Error('User must be a User model'));
    }
    const newPost = Object.assign(options, {createdBy: user});
    mongoose.model('Post').create(newPost)
    .then(user => resolve(user))
    .catch(err => reject(err));
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
