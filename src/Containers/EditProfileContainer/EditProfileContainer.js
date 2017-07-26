import React from 'react';
import { Redirect } from 'react-router-dom';
import {graphql, gql, compose} from 'react-apollo';
import { connect } from 'react-redux';

class EditProfileContainer extends React.Component {

  send = (e) => {
    e.preventDefault();
    const {
      name: { value: name},
      location: { value: location},
      bio: { value: bio}
    } = e.target;
    console.log(name, location, bio);
    this.props.mutate({
      variables: {
        name,
        location,
        bio
      },
      update: (store, { data: { editProfile: { profile } } }) => {
        const data = store.readQuery({query: profileQuery});
        data.profile = Object.assign({}, data.profile, profile);
        store.writeQuery({
          query: profileQuery,
          data
        });
      }
    })
    .then(res => {
      this.props.flashSuccess('Successfully updated profile.');
    });
  }

  render() {
    const { data: { loading, error, currentUser } } = this.props;
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>Encountered error: {error}</h2>;
    }
    if (!currentUser) {
      return <Redirect to="/" />;
    }
    const {profile: { name, location, bio } } = currentUser;

    return (
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={this.send}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" defaultValue={name} />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input name="location" type="text" defaultValue={location} />
          </div>
          <div className="field">
            <label htmlFor="bio">Biography</label>
            <textarea name="bio" defaultValue={bio} />
          </div>
          <input className="button" type="submit" value="Confirm Changes" />
        </form>
      </div>
    );
  }

};

const profileQuery = gql`
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

const profileMutation = gql`
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

const mapDispatchToProps = (dispatch) => ({
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
});

export default compose(
  graphql(profileQuery),
  graphql(profileMutation),
  connect(null, mapDispatchToProps)
)(EditProfileContainer);
