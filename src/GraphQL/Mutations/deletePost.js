import { gql } from 'react-apollo';

export default gql`
  mutation deleteMutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
