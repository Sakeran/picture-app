import React from 'react';
import { connect } from 'react-redux';

import Header from '../../Components/Header/Header';

const HeaderContainer = (props) => (
  <Header user={props.user} />
);

const mapStateToProps = (state) => ({
  user: state.common.user
});

export default connect(mapStateToProps)(HeaderContainer);
