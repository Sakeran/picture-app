import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../../Components/SafeImage/SafeImage';
import PostDetails from '../../Components/PostDetails/PostDetails';
import PostStats from '../../Components/PostStats/PostStats';
import CommentList from '../../Components/CommentList/CommentList';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

import { graphql, gql, compose} from 'react-apollo';

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
    return (
      <div className="PostContainer">
        <div className="PostContainer-display">
          <SafeImage className="PostContainer-img" src={post.image} alt={post.title} />
        </div>
        <PostDetails {...postDetails} />
        <PostStats {...postStats}/>
        <CommentList comments={post.comments} />
        <button onClick={this.props.loadMoreComments}>More</button>
        {currentUser && <AddCommentForm postId={post.id}/>}
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
      comments(offset: 0) @connection(key: "comments", filter:["offset"]) {
        id
        text
        date
        user {
          id
          username
        }
      }
    }
  }
`;
const postCommentsQuery = gql`
query moreCommentsQuery($id: ID!, $offset: Int!) {
  post(id: $id) {
    id
    comments(offset: $offset) @connection(key: "comments", filter:["offset"]) {
      id
      text
      date
      user {
        id
        username
      }
    }
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


export { PostContainer };
export default compose(
  graphql(postDetailsQuery, {
    name: 'PostQuery',
    options: (props) => ({
      variables: {
        id: props.postId
      }
    }),
    props: (props) => ({
      ...props,
      loadMoreComments: () => {
        return props.PostQuery.fetchMore({
          query: postCommentsQuery,
          variables: {
            id: props.ownProps.postId,
            offset: props.PostQuery.post.comments.length
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return prevResult; }
            const { post: prevPost} = prevResult;
            const {comments: prevComments} = prevPost;
            const { post: { comments: nextComments} } = fetchMoreResult;
            const newComments = [...prevComments, ...nextComments];
            const newPost = Object.assign({}, prevPost, {
              comments: newComments
            });
            return { post: newPost };
          }
        })
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
  })
)(PostContainer);
