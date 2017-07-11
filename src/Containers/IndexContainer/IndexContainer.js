import React from 'react';
import latestPosts from '../../GraphQL/latestPosts';

class IndexContainer extends React.Component {

  componentDidMount() {
    console.log("Fetching post data");
    latestPosts()
    .then(posts => console.log(posts));
  }

  render() {
    return (
      <h3> Index Container </h3>
    );
  }
}

export default IndexContainer;
