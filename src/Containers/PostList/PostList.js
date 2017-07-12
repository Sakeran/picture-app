import React from 'react';
import { connect } from 'react-redux';

import PostCard from '../../Components/PostCard/PostCard';
import getPost from '../../GraphQL/getPost';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    // Check each post id as it is passed in. Query for any data that does
    // not exist in store. The list will only display once everything is
    // finished loading.
    const queries = this.props.postIDs.map(e => {
      if(!this.props.posts[e]) {
        return getPost(e)
        .then(post => {
          this.props.addPost(post);
        });
      }
      return Promise.resolve(true);
    });
    Promise.all(queries)
    .then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div>
      <h3> {this.state.loading ? "Loading" : "Ready!"} </h3>
        {this.props.postIDs.map(e => (
          <PostCard key={e} post={this.props.posts[e]} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch({type:'ADD_POST', post: post})
});

export { PostList }
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
