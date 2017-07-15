import React from 'react';

const Post = ({match}) => (
  <h2>Post #{match.params.id}</h2>
);

export default Post;
