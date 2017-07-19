const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const youtubeRegex = require('youtube-regex');
const getYoutubeId = require('get-youtube-id');

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
  description: {
    type: String,
    get: (desc) => desc || "No Description"
  },
  youtubeID: {
    type: String,
    get: (id) => id || null
  },
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

// Virtual attributes
postSchema.virtual('image').get(function() {
  if (this.postType === 'image') {
    return this.imageLink;
  }
  if (this.postType === 'youtube') {
    return `http://img.youtube.com/vi/${this.youtubeID}/maxresdefault.jpg`;
  }
  console.error(`Post ID ${this.id} could not produce a display image.`);
  return null;
});

postSchema.virtual('type').get(function() {
  return this.postType;
});

postSchema.virtual('creator').get(function() {
  return this.populate('createdBy')
  .execPopulate()
  .then(post => post.createdBy);
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

///////////////////
// Static Methods
///////////////////

postSchema.static('createUserPost', function(user, {title, description, link}) {
  return new Promise((resolve, reject) => {
    if (!user || user.constructor.modelName !== 'User') {
      return reject(new Error('User must be a User model'));
    }
    const postData = {
      createdBy: user,
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
        return reject(new Error('Youtube links must contain valid a valid id'));
      }
      postData.postType = 'youtube';
      postData.youtubeID = id;
    }
    mongoose.model('Post').create(postData)
    .then(user => resolve(user))
    .catch(err => reject(err));
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
