import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import currentUser from '../../GraphQL/currentUser';
import 'normalize.css';
import './App.css';

import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import Flash from '../../Containers/Flash/Flash';
import Routes from '../Routes/Routes';

class App extends Component {

  componentDidMount() {
    // Check if currently logged in, and set the user if true.
    currentUser()
    .then(user => {
      if(user) {
        this.props.setUser(user);
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderContainer />
          <Flash />
          <div className="App-main">
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({type: 'LOGIN_USER', user: user})
})

export { App }
export default connect(null, mapDispatchToProps)(App);
