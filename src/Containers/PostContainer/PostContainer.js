import React from 'react';

class PostContainer extends React.Component {

  constructor() {
    super();
    
  }

  render() {
    return (
      <h2>Post #{this.props.PostId}</h2>
    );
  }

};


export default PostContainer;
