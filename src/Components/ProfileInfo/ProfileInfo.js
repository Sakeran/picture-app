import React from 'react';
import PropTypes from 'prop-types';

import './ProfileInfo.css';

const ProfileInfo = ({ name, location, bio}) => (
  <div className="ProfileInfo">
    <h2 className="ProfileInfo-name">{name || 'No Given Name'}</h2>
    <div className="ProfileInfo-row">
      <h3>Location:</h3>
      <span className="ProfileInfo-span">{location || "Location Unknown"}</span>
    </div>
    <div className="ProfileInfo-row">
      <h3>About Me:</h3>
      <span className="ProfileInfo-span">{bio || 'No Information'}</span>
    </div>
  </div>
);

ProfileInfo.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  bio: PropTypes.string,
};

export default ProfileInfo;
