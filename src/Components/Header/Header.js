import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => (
  <header className="Header">
    <h1>Pintrest Clone</h1>
    {props.nav}
  </header>
);

Header.propTypes = {
  nav: PropTypes.element.isRequired
};

export default Header;
