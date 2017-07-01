import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Nav from '../Nav/Nav';

import './Header.css';

const Header = (props) => (
  <header className="Header">
    <Link to="/">
      <h1 className="Header-Logo">Pintrest Clone</h1>
    </Link>
    <Nav user={props.user} />
  </header>
);

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
