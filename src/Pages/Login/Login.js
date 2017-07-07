import React from 'react';
import LoginForm from '../../Containers/LoginForm/LoginForm';
import login from '../../GraphQL/login';

const Login = (props) => (
  <div className="LoginPage">
    <h2>Login</h2>
    <LoginForm sendFunc={login}/>
  </div>
);

export default Login;
