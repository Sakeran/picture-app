import React from 'react';
import ProfileContainer from '../../Containers/ProfileContainer/ProfileContainer';


const Profile = ({ match: { params: uid } } ) => (
  <ProfileContainer userId={uid.uid} />
)

export default Profile;
