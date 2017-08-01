import React from 'react';
import { graphql } from 'react-apollo';

import latestPosts from '../../GraphQL/Queries/latestPosts';

import PostList from '../PostList/PostList';

class IndexContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listedPosts: []
    };
  }

  render() {
    const { loading, error, listPosts, loadMorePosts, totalPosts } = this.props;
    if (loading) {
      return <h2 className="header">Loading Latest Posts...</h2>
    }
    if (error) {
      return <h2 className="header">Error occured while loading latest posts.</h2>
    }
    const props = {
      posts: listPosts,
      loadMorePosts,
      totalPosts
    }
    return (
      <div>
        <h2 className="header">Latest Posts</h2>
        <PostList {...props} />
      </div>
    );
  }
}

export { IndexContainer }
export default graphql(latestPosts, {
  options: (props) => ({
    variables: {
      offset: 0,
      limit: 20
    },
  }),
  props: ({ data: { loading, error, listPosts, totalPosts, fetchMore } }) => ({
    loading,
    error,
    listPosts,
    totalPosts,
    loadMorePosts: () => fetchMore({
      variables: {
        offset: listPosts.length,
        limit: 10
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return Object.assign({}, previousResult, {
          listPosts: [...previousResult.listPosts, ...fetchMoreResult.listPosts]
        });
      }
    })
  })
})(IndexContainer);
