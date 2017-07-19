import React from 'react';
import LoginForm from '../../Containers/LoginForm/LoginForm';

const Login = (props) => (
  <div className="LoginPage">
    <div className="centered">
      <a className="button" href="/auth/twitter">Log In With Twitter</a>
    </div>
    <span className="divider">OR</span>
    <h2 className="centered header">Login Locally</h2>
    <LoginForm />
  </div>
);

export default Login;
