import { gql } from 'react-apollo';

export default gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`;
