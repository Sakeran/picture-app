import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../../Components/SafeImage/SafeImage';
import PostDetails from '../../Components/PostDetails/PostDetails';
import PostDeleteButton from '../../Components/PostDeleteButton/PostDeleteButton';
import PostStatsContainer from '../PostStatsContainer/PostStatsContainer';
import CommentListContainer from '../CommentListContainer/CommentListContainer';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import YoutubeContainer from '../YoutubeContainer/YoutubeContainer';

import { graphql, compose } from 'react-apollo';
import userPostStatus from '../../GraphQL/Queries/userPostStatus';
import postDetails from '../../GraphQL/Queries/postDetails';
import deletePost from '../../GraphQL/Mutations/deletePost';

import { connect } from 'react-redux';

import './PostContainer.css';

class PostContainer extends React.Component {

  delete = () => {
    this.props.deleteMutation({
      variables: {
        postId: this.props.postId
      }
    })
    .then(({data: { deletePost }}) => {
      if (deletePost) {
        this.props.flashSuccess('Post was deleted.');
        this.props.requestRedirect('/');
        return;
      }
      this.props.flashError('Failed to delete post.');
    });
  }

  render() {
    const { PostQuery: { loading: postLoading, error, post }} = this.props;
    const { UserQuery: { loading: userLoading, currentUser }} = this.props;
    const pageLoading = postLoading || userLoading;
    if (pageLoading) {
      return <h2 className="header">Loading...</h2>;
    }
    if (error) {
      return <h2 className="header">Error While Loading Post</h2>;
    }
    const postDetails = {
      title: post.title,
      description: post.description,
      postDate: post.postDate,
      creator: post.creator
    };
    const postStats = {
      user: currentUser,
      post
    };
    // Show the "delete" button only if the user is logged in, and either
    // owns the post or is an admin.
    const showDeleteOption = currentUser && (currentUser.isAdmin ||
                             currentUser.id === post.creator.id);
    return (
      <div className="PostContainer">
        <div className="PostContainer-display">
          {post.type === 'youtube' ?
            <YoutubeContainer videoId={post.youtubeID} />
            :
            <SafeImage className="PostContainer-img" src={post.image} alt={post.title} />
          }
        </div>
        <div className="PostContainer-subdisplay section-border">
          <PostDetails {...postDetails} />
          {showDeleteOption && <PostDeleteButton deleteFn={this.delete} />}
          <PostStatsContainer {...postStats}/>
          <CommentListContainer user={currentUser}
                                postId={post.id}
                                count={post.commentCount} />
          {currentUser && <AddCommentForm postId={post.id} count={post.commentCount}/>}
        </div>
      </div>
    );
  }

};

PostContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  requestRedirect: () => dispatch({type: 'REQUEST_REDIRECT', location: '/'}),
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg}),
});

export { PostContainer };
export default compose(
  graphql(postDetails, {
    name: 'PostQuery',
    options: (props) => ({
      variables: {
        id: props.postId
      }
    })
  }),
  graphql(userPostStatus, {
    name: 'UserQuery',
    options: (props) => ({
      variables: {
        id: props.postId
      }
    })
  }),
  graphql(deletePost, {
    name: 'deleteMutation',
    options: (props) => ({
      variables: {
        postId: props.postId
      }
    })
  }),
  connect(null, mapDispatchToProps)
)(PostContainer);
