import React from 'react';
import PropTypes from 'prop-types';

import './ProfileInfo.css';

const ProfileInfo = ({ name, location, bio}) => (
  <div className="ProfileInfo section-border">
    <h2 className="ProfileInfo-name">{name || "No Name Given"}</h2>
    <div className="ProfileInfo-section">
      <strong>Location:</strong> {location}
    </div>
    <div className="ProfileInfo-section">
      <strong>About:</strong> {bio}
    </div>
  </div>
);

ProfileInfo.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  bio: PropTypes.string,
};

export default ProfileInfo;
