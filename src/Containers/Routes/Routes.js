import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from '../../Pages/Index/Index';
import Login from '../../Pages/Login/Login';
import NotFound from '../../Pages/NotFound/NotFound';
import Signup from '../../Pages/Signup/Signup';

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
