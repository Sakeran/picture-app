import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';

class ProfileContainer extends React.Component {
  render() {
    const {data: {loading, error, user } } = this.props;
    console.log(this.props);
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>Error while loading profile.</h2>;
    }
    return (
      <div>
        <ProfileInfo {...user.profile} />
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  userId: PropTypes.string.isRequired,
};

const userProfileQuery = gql`
  query userProfile($id: ID!) {
    user(id: $id) {
      id
      profile {
        name
        location
        bio
      }
    }
  }
`;

export { ProfileContainer };
export default graphql(userProfileQuery, {
  options: (props) => ({
    variables: {
      id: props.userId
    }
  })
})(ProfileContainer);
