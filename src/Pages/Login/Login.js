import React from 'react';
import LoginForm from '../../Containers/LoginForm/LoginForm';
import login from '../../GraphQL/login';

const Login = (props) => (
  <div className="LoginPage">
    <h2><a href="/auth/twitter">Log In With Twitter</a></h2>
    <h2>Login Locally</h2>
    <LoginForm sendFunc={login}/>
  </div>
);

export default Login;
