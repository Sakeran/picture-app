import React from 'react';
import PropTypes from 'prop-types';

import SafeImage from '../../Components/SafeImage/SafeImage';
import PostDetails from '../../Components/PostDetails/PostDetails';
import PostStats from '../../Components/PostStats/PostStats';

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
    const postDetails = {
      title: post.title,
      description: post.description,
      postDate: post.postDate,
      creator: post.creator
    };
    const postStats = {
      likeCount: post.likeCount,
    };
    return (
      <div className="PostContainer">
        <div className="PostContainer-display">
          <SafeImage className="PostContainer-img" src={post.image} alt={post.title} />
        </div>
        <PostDetails {...postDetails} />
        <PostStats {...postStats}/>
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
