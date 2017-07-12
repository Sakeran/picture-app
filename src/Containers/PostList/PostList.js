import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostCard from '../../Components/PostCard/PostCard';

import Masonry from 'react-masonry-component';
import './PostList.css';

class PostList extends React.Component {

  componentDidMount() {
    // Check each post id as it is passed in. Query for any data that does
    // not exist in store. The list will only display once everything is
    // finished loading.
    this.props.postIDs.forEach(e => {
      if(!this.props.posts[e]) {
        return this.props.getPost(e)
        .then(post => {
          this.props.addPost(post);
        });
      }
    });
  }

  render() {
    return (
      <Masonry className="PostList-masonry" options={{fitWidth: true, gutter: 6}}>
        {this.props.postIDs.map(e => (
          this.props.posts[e] &&
          <PostCard key={e} post={this.props.posts[e]} />
        ))}
      </Masonry>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postIDs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch({type:'ADD_POST', post: post})
});

export { PostList }
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
