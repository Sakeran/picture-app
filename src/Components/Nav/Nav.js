import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = (props) => (
  <nav>
    <ul>
      {
        props.user ?
          <li><Link to="/logout">Log Out</Link></li>
        :
          <div>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </div>
      }
    </ul>
  </nav>
);

Nav.propTypes = {
  user: PropTypes.object
};

export default Nav;
