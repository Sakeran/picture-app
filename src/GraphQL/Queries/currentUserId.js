import { gql } from 'react-apollo';

export default gql`
  query currentUser {
    currentUser {
      id
    }
  }
`;
