import React from 'react';
import { connect } from 'react-redux';
import latestPosts from '../../GraphQL/latestPosts';

import PostList from '../PostList/PostList';

class IndexContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listedPosts: []
    };
  }

  componentDidMount() {
    latestPosts()
    .then(posts => {
      // Add each post's data to the store, then mark the Index
      // as displaying them.
      const ids = posts.map(e => {
        this.props.addPost(e);
        return e.id;
      });
      this.setState({
        listedPosts: ids
      });
    });
  }

  render() {
    return (
      <PostList postIDs={this.state.listedPosts} />
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch({type: 'ADD_POST', post: post})
});

export { IndexContainer }
export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
