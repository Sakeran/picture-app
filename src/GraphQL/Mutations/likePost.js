import { gql } from 'react-apollo';

export default gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
    }
  }
`;
