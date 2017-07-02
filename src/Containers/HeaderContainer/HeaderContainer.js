import React from 'react';
import { connect } from 'react-redux';

import Header from '../../Components/Header/Header';

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuToggled: false
    }
  }

  toggleMenu = () => {
    console.log('toggle');
    this.setState({
      menuToggled: !this.state.menuToggled
    });
  }

  render() {
    return (
      <Header user={this.props.user}
              toggleFn={this.toggleMenu}
              toggledMenu={this.state.menuToggled} />
    )
  }

};

const mapStateToProps = (state) => ({
  user: state.common.user
});

export default connect(mapStateToProps)(HeaderContainer);
