import React from 'react';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

  submit = ({username, password, passwordConfirm}) => {
    this.props.sendFunc(username, password, passwordConfirm)
    .then(userData => {
      const user = JSON.parse(userData);
      if (!user) {
        console.warn('Signup attempt returned null');
        return;
      }
      this.props.loginUser(user);
    });
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/" />
    }
    return (
      <Formsy.Form onValidSubmit={this.submit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}>
       <TextInput name="username"
                  title="Username"
                  required
                  validations={{
                    minLength: 3,
                    hasSpaces: (values, value) =>
                               (value.indexOf(" ") === -1)
                  }}
                  validationErrors={{
                    minLength: 'Username must be at least 3 characters. ',
                    hasSpaces: 'Username cannot contain spaces.'
                  }}
                  value="" />
        <TextInput name="password"
                   type="password"
                   title="Password"
                   required
                   validations={{
                     minLength: 6
                   }}
                   validationErrors={{
                     minLength: 'Password must be at least 6 characters. '
                   }}
                   value=""/>
        <TextInput name="passwordConfirm"
                   type="password"
                   title="Confirm Password"
                   required
                   validations={{
                     matches: (values, value) => (value === values.password)
                   }}
                   validationErrors={{
                     matches: 'Confirmation must match password.'
                   }}
                   value=""/>
        <input type="submit"
               className="button"
                value="Sign Up"
                disabled={!this.state.canSubmit} />
      </Formsy.Form>
    );
  }
}

SignupForm.propTypes = {
  sendFunc: PropTypes.func.isRequired,
  loginUser: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.common.user
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch({type: 'LOGIN_USER', user: user})
});

const ConnectedSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export { SignupForm };
export default ConnectedSignupForm;
