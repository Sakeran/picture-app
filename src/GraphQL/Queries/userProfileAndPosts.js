import { gql } from 'react-apollo';

export default gql`
  query userProfileAndPosts($id: ID!, $postOffset: Int!) {
    user(id: $id) {
      id
      profile {
        name
        location
        bio
      }
      posts(offset: $postOffset) {
        id
        image
        likeCount
        commentCount
      }
      postCount
    }
  }
`;
