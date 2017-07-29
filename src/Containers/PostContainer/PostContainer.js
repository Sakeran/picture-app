import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../../Components/SafeImage/SafeImage';
import PostDetails from '../../Components/PostDetails/PostDetails';
import PostDeleteButton from '../../Components/PostDeleteButton/PostDeleteButton';
import PostStats from '../../Components/PostStats/PostStats';
import CommentListContainer from '../CommentListContainer/CommentListContainer';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import YoutubeContainer from '../YoutubeContainer/YoutubeContainer';

import { graphql, gql, compose} from 'react-apollo';
import { connect } from 'react-redux';

import './PostContainer.css';

class PostContainer extends React.Component {

  handleLikeClick = (e) => {
    e.preventDefault();
    const { UserQuery: { currentUser } } = this.props;
    if (!currentUser) {
      return;
    }
    currentUser.likesPost ? this.unlike() : this.like();
  }

  like = () => {
    const { PostQuery: { post: { id, likeCount } } } = this.props;
    this.props.likeMutation({
      variables: {
        postId: id
      },
      refetchQueries: ['userWithLikeStatus'],
      optimisticResponse: {
        likePost: {
          id: id,
          likeCount: likeCount + 1,
          __typename: 'Post',
        }
      },
    });
  }

  unlike() {
    const { PostQuery: { post: { id, likeCount } } } = this.props;
    this.props.unlikeMutation({
      variables: {
        postId: id
      },
      refetchQueries: ['userWithLikeStatus'],
      optimisticResponse: {
        unlikePost: {
          id: id,
          likeCount: likeCount - 1,
          __typename: 'Post',
        }
      }
    });
  }

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
    const likesPost = currentUser ? currentUser.likesPost : false;
    const pageLoading = postLoading || userLoading;
    if (pageLoading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>Error While Loading Post</h2>;
    }
    const postDetails = {
      title: post.title,
      description: post.description,
      postDate: post.postDate,
      creator: post.creator
    };
    const postStats = {
      user: currentUser,
      likeCount: post.likeCount,
      liked: likesPost,
      likeFunc: this.handleLikeClick
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
        <PostDetails {...postDetails} />
        {showDeleteOption && <PostDeleteButton deleteFn={this.delete} />}
        <PostStats {...postStats}/>
        <CommentListContainer postId={post.id} count={post.commentCount} />
        {currentUser && <AddCommentForm postId={post.id} count={post.commentCount}/>}
      </div>
    );
  }

};

PostContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

const currentUserQuery = gql`
  query userWithLikeStatus($id: ID!) {
    currentUser {
      id
      likesPost(postId: $id)
      isAdmin
    }
  }
`;

const postDetailsQuery = gql`
  query postDetails($id: ID!) {
    post(id: $id) {
      id
      type
      title
      description
      postDate
      image
      youtubeID
      creator {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;

const likeMutation = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
    }
  }
`;

const unlikeMutation = gql`
  mutation unlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
      likeCount
    }
  }
`;

const deleteMutation = gql`
  mutation deleteMutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const mapDispatchToProps = (dispatch) => ({
  requestRedirect: () => dispatch({type: 'REQUEST_REDIRECT', location: '/'}),
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg}),
});


export { PostContainer };
export default compose(
  graphql(postDetailsQuery, {
    name: 'PostQuery',
    options: (props) => ({
      variables: {
        id: props.postId
      }
    })
  }),
  graphql(currentUserQuery, {
    name: 'UserQuery',
    options: (props) => ({
      variables: {
        id: props.postId
      }
    })
  }),
  graphql(likeMutation, {
    name: 'likeMutation',
    options: (props) => ({
      variables: {
        postId: props.postId
      }
    })
  }),
  graphql(unlikeMutation, {
    name: 'unlikeMutation',
    options: (props) => ({
      variables: {
        postId: props.postId
      }
    })
  }),
  graphql(deleteMutation, {
    name: 'deleteMutation',
    options: (props) => ({
      variables: {
        postId: props.postId
      }
    })
  }),
  connect(null, mapDispatchToProps)
)(PostContainer);
