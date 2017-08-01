import { gql } from 'react-apollo';

export default gql`
  query currentProfile {
    currentUser {
      id
      profile {
        name
        location
        bio
      }
    }
  }
`;
