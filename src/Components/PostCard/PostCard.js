import React from 'react';

import './PostCard.css';

const renderImage = (link, alt) => (
  <img className="PostCard-img" src={link} alt={alt} />
)

const renderYoutube = (id) => (
  <strong>Youtube Placeholder</strong>
);

const PostCard = (props) => (
  <div className="PostCard-main">
    <div className="PostCard-stats">
      {props.post.type === 'image' ? renderImage(props.post.image, props.post.title) : renderYoutube(props.post.youtubeID)}
      <strong> Post Stats </strong>
    </div>
  </div>
);

export default PostCard;
