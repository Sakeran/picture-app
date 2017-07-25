import React from 'react';
import PropTypes from 'prop-types';

import './Comment.css';

const Comment = ({comment: {user, date, text}}) => (
  <div className="Comment section-border">
    <h4 className="Comment-header">{user.username} commented on {date}</h4>
    <p className="Comment-text">{text}</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
