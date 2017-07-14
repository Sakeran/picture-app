import React from 'react';
import NewPostForm from '../../Containers/NewPostForm/NewPostForm';
import createPost from '../../GraphQL/createPost';

const NewPost = (props) => (
  <div className="NewPostPage">
    <h2 className="header">New Post</h2>
    <NewPostForm sendFunc={createPost} />
  </div>
);

export default NewPost;
