import { gql } from 'react-apollo';

export default gql`
  query queryPostComments($postId: ID!, $offset: Int!) {
    comments(postId: $postId, offset: $offset) {
      id
      text
      date
      deleted
      user {
        id
        username
      }
    }
  }
`;
