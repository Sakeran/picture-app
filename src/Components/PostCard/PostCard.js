import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../SafeImage/SafeImage';

import './PostCard.css';



const PostCard = (props) => (
  <div className="PostCard-main">
    <SafeImage className="PostCard-img" src={props.post.image} alt={props.post.title} />
    <div className="PostCard-stats">
      <div className="PostCard-stat">
        <i className="fa fa-lg fa-heart" aria-hidden="true"></i>
        <div className="PostCard-number">
          {props.post.likeCount}
        </div>
      </div>
      <div className="PostCard-stat">
        <i className="fa fa-lg fa-comment" aria-hidden="true"></i>
        <div className="PostCard-number">
          {props.post.commentCount}
        </div>
      </div>
    </div>
  </div>
);

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostCard;
