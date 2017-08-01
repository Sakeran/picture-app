import React from 'react';
import { Redirect } from 'react-router-dom';

import currentProfile from '../../GraphQL/Queries/currentProfile';
import editProfile from '../../GraphQL/Mutations/editProfile';
import {graphql, compose} from 'react-apollo';
import { connect } from 'react-redux';

class EditProfileContainer extends React.Component {

  send = (e) => {
    e.preventDefault();
    const {
      name: { value: name},
      location: { value: location},
      bio: { value: bio}
    } = e.target;
    this.props.mutate({
      variables: {
        name,
        location,
        bio
      },
      update: (store, { data: { editProfile: { profile } } }) => {
        const data = store.readQuery({query: currentProfile});
        data.profile = Object.assign({}, data.profile, profile);
        store.writeQuery({
          query: currentProfile,
          data
        });
      }
    })
    .then(res => {
      const { data: { editProfile: {id} } } = res;
      this.props.flashSuccess('Successfully updated profile.');
      this.props.requestRedirect(`/profile/${id}`);
    });
  }

  render() {
    const { data: { loading, error, currentUser } } = this.props;
    if (loading) {
      return <h2 className="header">Loading...</h2>;
    }
    if (error) {
      return <h2 className="header">Encountered error: {error}</h2>;
    }
    if (!currentUser) {
      return <Redirect to="/" />;
    }
    const {profile: { name, location, bio } } = currentUser;

    return (
      <div>
        <h2 className="header">Edit Profile</h2>
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

const mapDispatchToProps = (dispatch) => ({
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  requestRedirect: (location) => dispatch({type: 'REQUEST_REDIRECT', location})
});

export default compose(
  graphql(currentProfile),
  graphql(editProfile),
  connect(null, mapDispatchToProps)
)(EditProfileContainer);
