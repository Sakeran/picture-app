import React from 'react';

const renderImage = (link) => (
  <img className="PostCard-img" src={link} />
)

const renderYoutube = (id) => (
  <strong>Youtube Placeholder</strong>
);

const PostCard = (props) => (
  <div className="PostCard-main grid-tile">
    {props.post.type === 'image' ? renderImage(props.post.image) : renderYoutube(props.post.youtubeID)}
  </div>
);

export default PostCard;
