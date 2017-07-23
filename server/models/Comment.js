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
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

commentSchema.virtual('date').get(function() {
  return moment(this.createdAt).format('MMMM Do YYYY');
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
