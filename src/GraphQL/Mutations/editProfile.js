import { gql } from 'react-apollo';

export default gql`
  mutation editProfile($name: String, $location: String, $bio: String) {
    editProfile(name: $name, location: $location, bio: $bio) {
      id
      profile {
        name
        location
        bio
      }
    }
  }
`;
