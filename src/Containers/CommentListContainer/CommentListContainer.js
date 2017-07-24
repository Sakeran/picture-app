import React from 'react';
import PropTypes from 'prop-types';

import { graphql, gql, compose} from 'react-apollo';
import CommentList from '../../Components/CommentList/CommentList';

class CommentListContainer extends React.Component {

  render() {
    return <h3>Comments Go Here</h3>
    // return <CommentList />
  }

}

CommentListContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentListContainer;
