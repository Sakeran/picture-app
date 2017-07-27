import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PostDetails.css';

const PostDetails = ({title, description, postDate, creator: {username, id}}) => (
  <div className="PostDetails section-border">
    <div className="PostDetails-info">
      <h2>{title}</h2>
      <span className="PostDetails-creator-info">
        Posted by <Link to={`/profile/${id}`}>{username}</Link> on {postDate}
      </span>
    </div>
    <div className="PostDetails-description">
      <p>{description}</p>
    </div>
  </div>
);

PostDetails.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  creator: PropTypes.object.isRequired
}

export default PostDetails;
