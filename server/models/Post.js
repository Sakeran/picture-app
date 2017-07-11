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

  // TODO: Implement Youtube ID "validation"

  next();
});

postSchema.methods.hasValidImageLink = function() {
  if (!this.imageLink) { return false; }

  // We'll need to use something more sophisticated than this, given that
  // not all images on the web use one of these extenstions.

  // const extenstionMatcher = /((\.[a-z|A-Z|0-9]+)+)$/;
  // const allowed = ['.jpg', '.jpeg', '.gif', '.png'];
  // const matches = this.imageLink.match(extenstionMatcher);
  // if (!matches || allowed.indexOf(matches[0]) === -1) { return false; }

  // For now, just make sure the imageLink is an actual url.
  const urlMatcher = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if(!urlMatcher.test(this.imageLink)) { return false; }

  return true;
};

///////////////////
// Static Methods
///////////////////

postSchema.static('createUserPost', function(user, options) {
  return new Promise((resolve, reject) => {
    if (!user || user.constructor.modelName !== 'User') {
      return reject(new Error('User must be a User model'));
    }
    if(options.postType === 'youtube') {
      console.warn('Youtube posts not yet supported.');
      // Note: When we DO implement Youtube posts, we'll most likely
      // need to parse the YoutubeID field, as it will likely be a link.
      return reject(new Error('Youtube posts not supported'));
    }
    const newUser = Object.assign(options, {createdBy: user});
    mongoose.model('Post').create(newUser)
    .then(user => resolve(user))
    .catch(err => reject(err));
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
