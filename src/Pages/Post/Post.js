import React from 'react';
import PostContainer from '../../Containers/PostContainer/PostContainer';


const Post = ({match}) => (
  <div className="PostDisplayPage">
    <PostContainer PostId={match.params.id} />
  </div>
);

export default Post;
