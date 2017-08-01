import React from 'react';
import { graphql, compose } from 'react-apollo';

import currentUserId from '../../GraphQL/Queries/currentUserId';
import logout from '../../GraphQL/Mutations/logout';
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
    this.props.mutate({
      update: (store) => {
        const data = store.readQuery({ query: currentUserId });
        data.currentUser = null;
        store.writeQuery({ query: currentUserId, data });
      }
    })
  }

  render() {
    const {data: { currentUser } } = this.props;
    return (
      <Header user={currentUser}
              toggleFn={this.toggleMenu}
              toggledMenu={this.state.menuToggled}
              logoutFn={this.logout} />
    )
  }

};

export default compose(
  graphql(currentUserId),
  graphql(logout),
)(HeaderContainer);
