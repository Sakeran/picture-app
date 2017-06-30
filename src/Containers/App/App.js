import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'normalize.css';
import './App.css';

import Header from '../../Components/Header/Header';
import Index from '../../Pages/Index/Index';
import Login from '../../Pages/Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="App-main">
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
