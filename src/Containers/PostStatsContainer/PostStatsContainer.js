import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import likePost from '../../GraphQL/Mutations/likePost';
import unlikePost from '../../GraphQL/Mutations/unlikePost';

import PostStats from '../../Components/PostStats/PostStats';

class PostStatsContainer extends React.Component {

  handleLikeClick = (e) => {
    e.preventDefault();
    const { user } = this.props;
    if (!user) {
      return;
    }
    user.likesPost ? this.unlike() : this.like();
  }

  like = () => {
    const { post: { id, likeCount } } = this.props;
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
    const { post: { id, likeCount } } = this.props;
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

  render() {
    const {user, post} = this.props;
    const likesPost = user && (user.likesPost || false);
    const postStats = {
      user,
      likeCount: post.likeCount,
      liked: likesPost,
      likeFunc: this.handleLikeClick
    };
    return <PostStats {...postStats} />
  }
}

PostStatsContainer.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object.isRequired
}

export { PostStatsContainer };

export default compose(
  graphql(likePost, {
    name: 'likeMutation',
    options: (props) => ({
      variables: {
        postId: props.postId
      }
    })
  }),
  graphql(unlikePost, {
    name: 'unlikeMutation',
    options: (props) => ({
      variables: {
        postId: props.postId
      }
    })
  }),
)(PostStatsContainer);
