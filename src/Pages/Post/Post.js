import React from 'react';
import PostContainer from '../../Containers/PostContainer/PostContainer';


const Post = ({match}) => (
  <div className="PostDisplayPage">
    <PostContainer postId={match.params.id} />
  </div>
);

export default Post;
