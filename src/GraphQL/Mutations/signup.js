import { gql } from 'react-apollo';

export default gql`
  mutation signup($username: String!, $password: String!, $passwordConfirm: String!) {
    signup(username: $username, password: $password, passwordConfirm: $passwordConfirm) {
      id
    }
  }
`;
