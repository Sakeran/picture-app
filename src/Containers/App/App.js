import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'normalize.css';
import './App.css';

import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import Index from '../../Pages/Index/Index';
import Login from '../../Pages/Login/Login';
import NotFound from '../../Pages/NotFound/NotFound';
import Signup from '../../Pages/Signup/Signup';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderContainer />
          <div className="App-main">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
