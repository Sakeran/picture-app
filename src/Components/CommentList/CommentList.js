import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment/Comment';

import './CommentList.css';

const listWithComments = ({ comments, user, count, loadMore, deleteFn }) => (
  <div className="CommentList">
    <h3 className="centered">There are a total of {count} comments.</h3>
    <ul className="CommentList-List">
    {comments.map(e => (
      <li key={e.id}>
        <Comment comment={e}
                 deleteFn={deleteFn && deleteFn(e.id)}
                 user={user}
                 />
      </li>
    ))}
    </ul>
    {
      (count && loadMore && (count > comments.length)) &&
      <button className="CommentList-load-btn" onClick={loadMore}>
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
  loadMore: PropTypes.func,
  deleteFn: PropTypes.func
}

export default CommentList;
