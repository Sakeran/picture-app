import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = (props) => (
  <nav className={"Nav" + (props.toggled ? " Nav-is-toggled" : "") }>
    {
      props.user ?
        <ul>
          <li><Link to="/new">New Post</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button id="logoutBtn" onClick={props.logoutFn}>Log Out</button></li>
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
  toggled: PropTypes.bool,
  logoutFn: PropTypes.func
};

export default Nav;
