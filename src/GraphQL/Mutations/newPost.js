import { gql } from 'react-apollo';

export default gql`
  mutation newPost($title: String!, $link: String!, $description: String) {
    newPost(title: $title, link: $link, description: $description) {
      id
    }
  }
`;
