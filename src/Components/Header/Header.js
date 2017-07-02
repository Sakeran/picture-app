import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Nav from '../Nav/Nav';

import './Header.css';

const Header = (props) => (
  <header className="Header">
    <Link to="/">
      <h1 className="Header-Logo">LivePost</h1>
    </Link>
    <div id="Header-menuToggle" className="Header-menuToggleBtn" onClick={props.toggleFn}>
      MENU
    </div>
    <Nav user={props.user} toggled={props.toggledMenu} />
  </header>
);

Header.propTypes = {
  user: PropTypes.object,
  toggleFn: PropTypes.func.isRequired,
  toggledMenu: PropTypes.bool.isRequired
};

export default Header;
