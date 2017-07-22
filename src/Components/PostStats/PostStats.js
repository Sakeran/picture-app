import React from 'react';
import PropTypes from 'prop-types';

import './PostStats.css';

const getButtonClass = ({liked}) => ('fa fa-2x ' + (
  liked ?
  'fa-heart PostStats-is-liked'
  :
  'fa-heart-o'
));

const PostStats = (props) => (
  <div className="PostStats section-border">
    <div className="PostStats-btn-container">
      <button className="button" onClick={props.likeFunc}>
        <i className={getButtonClass(props)} aria-hidden="true"></i>
        <div>
          {props.liked ? "Unlike" : "Like"}
        </div>
      </button>
    </div>
      {props.likeCount || '0' } people like this post.
  </div>
);

PostStats.propTypes = {
  likeCount: PropTypes.number,
  likeFunc: PropTypes.func
};

export default PostStats;
