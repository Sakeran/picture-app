import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import userProfileAndPosts from '../../GraphQL/Queries/userProfileAndPosts';

import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';
import PostList from '../PostList/PostList';

class ProfileContainer extends React.Component {
  render() {
    const {data: {loading, error, user }, loadMorePosts } = this.props;
    if (loading) {
      return <h2 className="header">Loading...</h2>;
    }
    if (error) {
      return <h2 className="header">Error while loading profile.</h2>;
    }
    const postListProps = {
      posts: user.posts,
      totalPosts: user.postCount,
      loadMorePosts
    };
    return (
      <div>
        <ProfileInfo {...user.profile} />
        {
          user.postCount ?
            (<div>
              <h2 className="header">This user has the following posts:</h2>
              <PostList {...postListProps} />
            </div>)
          :
            <h2 className="header">This user has not posted anything yet.</h2>
        }
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  userId: PropTypes.string.isRequired,
};

export { ProfileContainer };
export default graphql(userProfileAndPosts, {
  options: (props) => ({
    variables: {
      id: props.userId,
      postOffset: 0,
    }
  }),
  props: (props) => ({
    ...props,
    loadMorePosts: () => {
      return props.data.fetchMore({
        variables: {
          id: props.ownProps.userId,
          postOffset: props.data.user.posts.length
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return prevResult; }
          return Object.assign({}, prevResult, {
            user: Object.assign({}, prevResult.user, {
              posts: [...prevResult.user.posts, ...fetchMoreResult.user.posts]
            })
          });
        }
      })
    }
  })
})(ProfileContainer);
