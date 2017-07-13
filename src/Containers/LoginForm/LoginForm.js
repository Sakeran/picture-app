import React from 'react';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {

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
    })
  }

  submit = ({username, password}) => {
    this.props.sendFunc(username, password)
    .then(userData => {
      console.log(userData);
      const user = JSON.parse(userData);
      if (!user) {
        console.warn('Login Attempt returned null');
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
                     minLength: 1,
                     hasSpaces: (values, value) =>
                                (value.indexOf(" ") === -1)
                   }}
                   validationErrors={{
                     minLength: 'Username cannot be blank. ',
                     hasSpaces: 'Username cannot contain spaces'
                   }}
                   value="" />
        <TextInput name="password"
                   type="password"
                   title="Password"
                   required
                   validations="minLength:1"
                   validationError="Invalid Password"
                   value="" />
        <input type="submit"
                className="button"
                disabled={!this.state.canSubmit}
                value="Log In" />
      </Formsy.Form>
    );
  }
}

LoginForm.propTypes = {
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

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export { LoginForm };
export default ConnectedLoginForm;
