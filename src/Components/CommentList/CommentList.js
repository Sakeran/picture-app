import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment/Comment';

import './CommentList.css';

const listWithComments = ({ comments, count, loadMore }) => (
  <div className="CommentList">
    <ul className="CommentList-List">
    {comments.map(e => (
      <li key={e.id}>
        <Comment comment={e}/>
      </li>
    ))}
    </ul>
    {
      (count && loadMore && (count > comments.length)) &&
      <button onClick={loadMore}>
        Load More Comments
      </button>
    }
  </div>
);

const CommentList = (props) => (
  props.count ? listWithComments(props)
  :
  (
    <div className="CommentList CommentList-no-comments">
      <h3 className="centered">
        There are no comments for this post.
      </h3>
    </div>
  )
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  count: PropTypes.number,
  loadMore: PropTypes.func
}

export default CommentList;
