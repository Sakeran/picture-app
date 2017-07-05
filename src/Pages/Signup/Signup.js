import React from 'react';
import { ConnectedSignupForm } from '../../Containers/SignupForm/SignupForm';
import newUser from '../../GraphQL/newUser';

const Signup = (props) => (
  <div className="SignupPage">
    <h2>Signup</h2>
    <ConnectedSignupForm sendFunc={newUser}/>
  </div>
);

export default Signup;
