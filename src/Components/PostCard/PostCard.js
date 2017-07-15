import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../SafeImage/SafeImage';

import './PostCard.css';

// <img className="PostCard-img" src={props.post.image} alt={props.post.title} />
const PostCard = (props) => (
  <div className="PostCard-main">
    <div className="PostCard-stats">
      <SafeImage className="PostCard-img" src={props.post.image} alt={props.post.title} />
      <strong> Post Stats </strong>
    </div>
  </div>
);

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostCard;
