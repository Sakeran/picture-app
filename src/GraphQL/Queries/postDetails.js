import { gql } from 'react-apollo';

export default gql`
  query postDetails($id: ID!) {
    post(id: $id) {
      id
      type
      title
      description
      postDate
      image
      youtubeID
      creator {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;
