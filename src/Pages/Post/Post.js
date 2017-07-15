import React from 'react';
import PostContainer from '../../Containers/PostContainer/PostContainer';


const Post = ({match}) => (
  <PostContainer PostId={match.params.id} />
);

export default Post;
