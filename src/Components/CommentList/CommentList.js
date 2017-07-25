import React from 'react';
import PropTypes from 'prop-types';

const CommentList = ({ comments, count, loadMore }) => (
  <div className="CommentList">
    <ul>
    {comments.map(e => (
      <li key={e.id}>
        {e.text}
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

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  count: PropTypes.number,
  loadMore: PropTypes.func
}

export default CommentList;
