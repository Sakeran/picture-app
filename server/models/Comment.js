const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  text: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedText: {
    type: String,
    get: (string) => {
      // This should only be viewable from the database itself.
      return '';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.virtual('date').get(function() {
  return moment(this.createdAt).format('MMMM Do YYYY');
});

// Deletes the comment if the user created the post or is an admin.
// Should begin displaying a default message instead of the actual text.
commentSchema.methods.deleteIfUserAllowed = function(user) {
  return new Promise((resolve, reject) => {
    if (!user || user.constructor.modelName !== 'User') {
      return reject(new Error('User must be a User model'));
    }
    const isAdmin = user.hasAdmin;
    const isOwner = this.user.equals(user.id);
    if (!isOwner && !isAdmin) {
      return resolve(false);
    }
    this.deleted = true;
    this.deletedText = this.text;
    this.text = '(This comment has been removed.)';
    this.save()
    .then(() => resolve(true));
  });
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
