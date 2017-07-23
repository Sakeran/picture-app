import React from 'react';
import PropTypes from 'prop-types';

import './PostStats.css';

const getButtonClass = ({liked}) => ('button' + (
  liked ?
  ' PostStats-is-liked'
  :
  ''
));

const getHeartClass = ({liked}) => 'fa fa-2x fa-heart' + (liked ? '' : '-o');

const likeCountMsg = (likeCount) => {
  if (likeCount === 1) {
    return '1 person likes this post.';
  }
  return likeCount + ' people like this post.';
}

const PostStats = (props) => (
  <div className="PostStats section-border">
    {props.user && (
      <div className="PostStats-btn-container">
        <button className={getButtonClass(props)} onClick={props.likeFunc}>
          <i className={getHeartClass(props)} aria-hidden="true"></i>
          <div>
            {props.liked ? "Unlike" : "Like"}
          </div>
        </button>
      </div>
    )}
      {likeCountMsg(props.likeCount)}
  </div>
);

PostStats.propTypes = {
  liked: PropTypes.bool,
  likeCount: PropTypes.number,
  likeFunc: PropTypes.func,
  user: PropTypes.object,
};

export default PostStats;
