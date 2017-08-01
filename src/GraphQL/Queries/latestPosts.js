import { gql } from 'react-apollo';

export default gql`
  query listPosts($offset: Int, $limit: Int) {
    totalPosts
    listPosts(offset: $offset, limit: $limit) {
      id
      image
      likeCount
      commentCount
    }
  }
`;
