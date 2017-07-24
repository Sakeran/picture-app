import React from 'react';
import PropTypes from 'prop-types';

import { graphql, gql, compose} from 'react-apollo';
import CommentList from '../../Components/CommentList/CommentList';

class CommentListContainer extends React.Component {

  render() {
    const { data: {loading, error, comments}} = this.props;
    if (loading) {
      return <h3 className="centered">Loading Comments</h3>
    }
    if (error) {
      return <h3 className="centered">Error While Loading Comments</h3>
    }
    return <CommentList comments={comments} />
  }

}

CommentListContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

const commentsQuery = gql`
  query queryPostComments($postId: ID!, $offset: Int!) {
    comments(postId: $postId, offset: $offset) @connection(key: "comments", filter:["postId"]) {
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
export { CommentListContainer };
export default compose(
  graphql(commentsQuery, {
    options: (props) => ({
      variables: {
        postId: props.postId,
        offset: 0
      }
    })
  })
)(CommentListContainer);
