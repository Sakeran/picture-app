import { gql } from 'react-apollo';

export default gql`
  mutation addComment($postId: ID!, $message: String!) {
    addComment(postId: $postId, message: $message) {
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
