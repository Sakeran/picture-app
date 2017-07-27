import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Comment.css';

const Comment = ({comment: {user: {username, id}, date, text}}) => (
  <div className="Comment section-border">
    <h4 className="Comment-header">
      <Link to={`profile/${id}`}>{username}</Link> commented on {date}
    </h4>
    <p className="Comment-text">{text}</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
