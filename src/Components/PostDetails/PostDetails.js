import React from 'react';
import PropTypes from 'prop-types';

import './PostDetails.css';

const PostDetails = (props) => (
  <div className="PostDetails">
    <div className="PostDetails-info">
      <h2>{props.title}</h2>
      <span className="PostDetails-creator-info">
        Posted by {props.creator.username} on {props.postDate}
      </span>
    </div>
    <div className="PostDetails-description">
      <p>{props.description}</p>
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
