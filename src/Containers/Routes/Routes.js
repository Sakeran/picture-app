import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from '../../Pages/Index/Index';
import Login from '../../Pages/Login/Login';
import NotFound from '../../Pages/NotFound/NotFound';
import Signup from '../../Pages/Signup/Signup';
import EditProfile from '../../Pages/EditProfile/EditProfile';
import NewPost from '../../Pages/NewPost/NewPost';
import Post from '../../Pages/Post/Post';

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/profile" component={EditProfile}/>
    <Route exact path="/new" component={NewPost} />
    <Route path="/post/:id" component={Post} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
