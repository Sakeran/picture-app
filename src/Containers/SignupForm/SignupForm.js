import React from 'react';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';

import { connect } from 'react-redux';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.requestRedirect('/');
    }
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
        this.props.flashError('Signup Failed');
        return;
      }
      this.props.flashSuccess(`Successfully signed up as ${user.username}`);
      this.props.loginUser(user);
    });
  }

  render() {
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
  user: PropTypes.object,
  flashSuccess: PropTypes.func,
  flashError: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.common.user
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch({type: 'LOGIN_USER', user: user}),
  requestRedirect: (location) => dispatch({type: 'REQUEST_REDIRECT', location}),
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg})
});

const ConnectedSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export { SignupForm };
export default ConnectedSignupForm;
