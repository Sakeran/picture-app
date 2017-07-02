import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = (props) => (
  <nav className={"Nav" + (props.toggled ? " Nav-is-toggled" : "") }>
    {
      props.user ?
        <ul>
          <li><Link to="/logout">Log Out</Link></li>
        </ul>
      :
        <ul>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
    }
  </nav>
);

Nav.propTypes = {
  user: PropTypes.object,
  toggled: PropTypes.bool
};

export default Nav;
