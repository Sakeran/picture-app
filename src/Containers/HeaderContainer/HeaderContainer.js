import React from 'react';
import { connect } from 'react-redux';
import logout from '../../GraphQL/logout';

import Header from '../../Components/Header/Header';

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuToggled: false
    }
  }

  toggleMenu = () => {
    this.setState({
      menuToggled: !this.state.menuToggled
    });
  }

  logout = () => {
    logout()
    .then(() => {
      this.props.logoutUser();
    });
  }

  render() {
    return (
      <Header user={this.props.user}
              toggleFn={this.toggleMenu}
              toggledMenu={this.state.menuToggled}
              logoutFn={this.logout} />
    )
  }

};

const mapStateToProps = (state) => ({
  user: state.common.user
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch({type: 'LOGOUT_USER'})
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
