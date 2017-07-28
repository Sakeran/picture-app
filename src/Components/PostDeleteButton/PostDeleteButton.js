import React from 'react';
import PropTypes from 'prop-types';

import './PostDeleteButton.css';

const PostDeleteButton = ({ deleteFn }) => (
  <div className="PostDelete section-border">
    <button className="button button-warning">Delete Post</button>
  </div>
);

PostDeleteButton.propTypes = {
  deleteFn: PropTypes.func.isRequired
};

export default PostDeleteButton;
