import React from 'react';
import SignupForm from '../../Containers/SignupForm/SignupForm';

const Signup = (props) => (
  <div className="SignupPage">
    <div className="centered">
      <a className="button" href="/auth/twitter">Log In With Twitter</a>
    </div>
    <span className="divider">OR</span>
    <h2 className="centered header">Sign Up Locally</h2>
    <SignupForm />
  </div>
);

export default Signup;
