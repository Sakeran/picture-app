import React from 'react';
import { gql, graphql, compose } from 'react-apollo';

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
        const data = store.readQuery({ query: currentUserQuery });
        data.currentUser = null;
        store.writeQuery({ query: currentUserQuery, data });
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

const currentUserQuery = gql`
  query currentUser {
    currentUser {
      id
    }
  }
`;

const logoutMutation = gql`
  mutation logout {
    logout
  }
`;

export { currentUserQuery };
export default compose(
  graphql(currentUserQuery),
  graphql(logoutMutation),
)(HeaderContainer);
