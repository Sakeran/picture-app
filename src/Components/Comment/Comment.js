import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Comment.css';

// Determines if the delete option should be shown for a given comment.
const showDeleteOption = (commentId, creator, user, deleteFn) => {
  if (!user || !deleteFn) { return false; }
  if (user.isAdmin || (user.id === creator.id) ) { return true; }
  return false;
};

const Comment = ({comment: {user: creator, date, text, id},
                  user,
                  deleteFn}) => (
  <div className="Comment section-border">
    <h4 className="Comment-header">
      <Link to={`/profile/${creator.id}`}>{creator.username}</Link> commented on {date}
      {showDeleteOption(id, creator, user, deleteFn) &&
        <button onClick={deleteFn}>(Delete This Comment)</button>
      }
    </h4>
    <p className="Comment-text">{text}</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object,
  deleteFn: PropTypes.func,
};

export default Comment;
