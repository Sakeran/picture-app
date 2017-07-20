import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PostCard from '../../Components/PostCard/PostCard';

import Masonry from 'react-masonry-component';
import './PostList.css';

class PostList extends React.Component {

  render() {
    const { posts, totalPosts, loadMorePosts } = this.props;
    return (
      <div>
        <Masonry className="PostList-masonry"
        updateOnEachImageLoad={true}
        options={{
          fitWidth: true,
          gutter: 6,
          stagger: 30
        }}>
        {posts.map(e => (
          <Link key={e.id} to={`/post/${e.id}`}>
          <PostCard post={e} />
          </Link>
        ))}
        </Masonry>
        {
          (posts.length < totalPosts) &&
          (
            <button className="PostList-load-btn" onClick={loadMorePosts}>
              Get More Posts
            </button>
          )
        }
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export { PostList }
export default PostList;
