import React from 'react';
import PropTypes from 'prop-types';

const CommentList = ({ comments }) => (
  <div className="CommentList">
    <ul>
    {comments.map(e => (
      <li key={e.id}>
        {e.text}
      </li>
    ))}
    </ul>
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList;
