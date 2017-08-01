import { gql } from 'react-apollo';

export default gql`
  query userWithLikeStatus($id: ID!) {
    currentUser {
      id
      likesPost(postId: $id)
      isAdmin
    }
  }
`;
