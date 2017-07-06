import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css';
import './App.css';

import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import Routes from '../Routes/Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderContainer />
          <div className="App-main">
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
