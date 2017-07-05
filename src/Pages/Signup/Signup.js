import React from 'react';
import SignupForm from '../../Containers/SignupForm/SignupForm';
import newUser from '../../GraphQL/newUser';

const Signup = (props) => (
  <div className="SignupPage">
    <h2>Signup</h2>
    <SignupForm sendFunc={newUser}/>
  </div>
);

export default Signup;
