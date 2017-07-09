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
  youtubeThumbnail: String,
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
  const extenstionMatcher = /((\.[a-z|A-Z|0-9]+)+)$/;
  const allowed = ['.jpg', '.jpeg', '.gif', '.png'];
  const matches = this.imageLink.match(extenstionMatcher);
  if (!matches || allowed.indexOf(matches[0]) === -1) { return false; }
  return true;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
