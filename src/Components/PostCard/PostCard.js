import React from 'react';

import './PostCard.css';

const renderImage = (link) => (
  <img className="PostCard-img" src={link} />
)

const renderYoutube = (id) => (
  <strong>Youtube Placeholder</strong>
);

const PostCard = (props) => (
  <div className="PostCard-main grid-tile">
    {props.post.type === 'image' ? renderImage(props.post.image) : renderYoutube(props.post.youtubeID)}
    <div className="PostCard-stats">
      <strong> Post Stats </strong>
    </div>
  </div>
);

export default PostCard;
