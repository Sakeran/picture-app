import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../../Components/SafeImage/SafeImage';

import { graphql, gql, compose} from 'react-apollo';

import './PostContainer.css';

class PostContainer extends React.Component {

  render() {
    const { data: {loading, error, post}} = this.props;
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>Error While Loading Post</h2>;
    }
    return (
      <div className="PostContainer">
        <div className="PostContainer-display">
          <SafeImage className="PostContainer-img" src={post.image} alt={post.title} />
        </div>
        <div className="PostContainer-details">
          <h3>{post.title}</h3>
          <p>Posted by {post.creator.username}</p>
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
  postId: PropTypes.string.isRequired
};

const postDetailsQuery = gql`
  query postDetails($id: ID!) {
    post(id: $id) {
      id
      type
      title
      image
      youtubeID
      creator {
        id
        username
      }
    }
  }
`;

export { PostContainer };
export default compose(
  graphql(postDetailsQuery, {
    options: (props) => ({
      variables: {
        id: props.postId
      }
    })
  })
)(PostContainer);
