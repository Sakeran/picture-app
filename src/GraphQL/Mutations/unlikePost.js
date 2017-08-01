import { gql } from 'react-apollo';

export default gql`
  mutation unlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
      likeCount
    }
  }
`;
