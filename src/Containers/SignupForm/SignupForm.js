import React from 'react';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';

import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { currentUserQuery } from '../HeaderContainer/HeaderContainer';

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
    this.props.mutate({
      variables: {
        username,
        password,
        passwordConfirm
      },
      update: (store, {data: { signup }}) => {
        if (!signup) { return; }
        const data = store.readQuery({query: currentUserQuery});
        data.currentUser = signup;
        store.writeQuery({query: currentUserQuery, data});
      }
    })
    .then(res => {
      if(!res.data.login) {
        return this.flashError('Signup failed.');
      }
      this.props.flashSuccess('Successfully created account.');
      this.props.requestRedirect('/');
    })
    .catch(({graphQLErrors}) => {
      this.props.flashError(graphQLErrors[0].message);
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

const mapStateToProps = (state) => ({
  user: state.common.user
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch({type: 'LOGIN_USER', user: user}),
  requestRedirect: (location) => dispatch({type: 'REQUEST_REDIRECT', location}),
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg})
});

const signupMutation = gql`
  mutation signup($username: String!, $password: String!, $passwordConfirm: String!) {
    signup(username: $username, password: $password, passwordConfirm: $passwordConfirm) {
      id
    }
  }
`;

export { SignupForm };
export default compose(
  graphql(signupMutation),
  connect(mapStateToProps, mapDispatchToProps)
)(SignupForm);
