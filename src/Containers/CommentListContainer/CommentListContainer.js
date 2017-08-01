import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose} from 'react-apollo';

import commentsQuery from '../../GraphQL/Queries/commentsQuery';
import deleteCommentMutation from '../../GraphQL/Mutations/deleteCommentMutation';

import CommentList from '../../Components/CommentList/CommentList';

class CommentListContainer extends React.Component {

  deleteComment = (commentId) => () => {
    this.props.deleteCommentMutation({
      variables: {
        commentId
      },
      update: (store, { data: { deleteComment } }) => {
        if (!deleteComment) { return };
        const data = store.readQuery({
          query: commentsQuery,
          variables: {
            postId: this.props.postId,
            offset: 0,
          }
        });
        data.comments.forEach(comment => {
          if (comment.id === commentId) {
            comment.text = '(This comment has been removed)';
            comment.deleted = true;
          }
        });
        store.writeQuery({
          query: commentsQuery,
          variables: {
            postId: this.props.postId,
            offset: 0,
          },
          data,
        });
      }
    })
  }

  render() {
    const { data: {loading, error, comments} } = this.props;
    const { ownProps: {count, user}, loadMore } = this.props;
    if (loading) {
      return <h3 className="centered">Loading Comments</h3>
    }
    if (error) {
      return <h3 className="centered">Error While Loading Comments</h3>
    }
    return (<CommentList
              user={user}
              comments={comments}
              count={count}
              loadMore={loadMore}
              deleteFn={this.deleteComment}
              />);
  }

}

CommentListContainer.propTypes = {
  postId: PropTypes.string.isRequired,
  count: PropTypes.number,
  user: PropTypes.object
};

export { CommentListContainer };
export default compose(
  graphql(commentsQuery, {
    options: (props) => ({
      variables: {
        postId: props.postId,
        offset: 0
      }
    }),
    props: (props) => ({
      ...props,
      loadMore: () => {
        return props.data.fetchMore({
          variables: {
            postId: props.ownProps.postId,
            offset: props.data.comments.length
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return prevResult; }
            return Object.assign({}, prevResult, {
              comments: [...prevResult.comments, ...fetchMoreResult.comments]
            });
          }
        })
      }
    })
  }),
  graphql(deleteCommentMutation, {
    name: 'deleteCommentMutation'
  })
)(CommentListContainer);
