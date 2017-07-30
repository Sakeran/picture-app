import React from 'react';
import PropTypes from 'prop-types';

import { graphql, gql, compose} from 'react-apollo';
import CommentList from '../../Components/CommentList/CommentList';

class CommentListContainer extends React.Component {

  render() {
    const { data: {loading, error, comments} } = this.props;
    const { ownProps: {count}, loadMore } = this.props;
    if (loading) {
      return <h3 className="centered">Loading Comments</h3>
    }
    if (error) {
      return <h3 className="centered">Error While Loading Comments</h3>
    }
    return (<CommentList
              comments={comments}
              count={count}
              loadMore={loadMore}
              />);
  }

}

CommentListContainer.propTypes = {
  postId: PropTypes.string.isRequired,
  count: PropTypes.number,
  user: PropTypes.object
};

const commentsQuery = gql`
  query queryPostComments($postId: ID!, $offset: Int!) {
    comments(postId: $postId, offset: $offset) {
      id
      text
      date
      user {
        id
        username
      }
    }
  }
`;
export { commentsQuery };
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
  })
)(CommentListContainer);
