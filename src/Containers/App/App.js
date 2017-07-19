import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'normalize.css';
import './App.css';

import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import Flash from '../../Containers/Flash/Flash';
import Routes from '../Routes/Routes';

class App extends Component {

  componentDidUpdate() {
    if(this.props.redirect) {
      this.props.clearRedirect();
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.props.redirect && <Redirect to={this.props.redirect} />}
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

const mapStateToProps = (state) => ({
  redirect: state.common.redirect
});

const mapDispatchToProps = (dispatch) => ({
  clearRedirect: () => dispatch({type: 'CLEAR_REDIRECT'})
});

const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export { App }
export default AppWithRedux;
