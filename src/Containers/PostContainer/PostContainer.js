import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../../Components/SafeImage/SafeImage';

import { connect } from 'react-redux';

import getPost from '../../GraphQL/getPost';

import './PostContainer.css';

class PostContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    // Get the relevant post from the server, then save it to store.
    getPost(props.PostId)
    .then(post => {
      this.props.addPost(post);
      this.setState({loading: false});
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    const post = this.props.posts[this.props.PostId];
    return (
      <div className="PostContainer">
        <div className="PostContainer-display">
          <SafeImage className="PostContainer-img" src={post.image} alt={post.title} />
        </div>
        <div className="PostContainer-details">
          <h3>{post.title}</h3>
          <p>Posted by {post.creatorName}</p>
          <p>{post.description}</p>
        </div>
        <div className="PostContainer-comments">
          <p>Comments go here</p>
        </div>
      </div>
    );
  }

};

PostContainer.propTypes = {
  PostId: PropTypes.string
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch({type:'ADD_POST', post})
});

export { PostContainer };
export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
