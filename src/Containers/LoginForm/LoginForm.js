import React from 'react';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';

import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { currentUserQuery } from '../HeaderContainer/HeaderContainer';

class LoginForm extends React.Component {

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
    })
  }

  submit = ({username, password}) => {
    this.props.mutate({
      variables: {
        username,
        password
      },
      update: (store, { data: { login } }) => {
        // Don't logout if null
        if (!login) { return; }
        const data = store.readQuery({ query: currentUserQuery });
        data.currentUser = login;
        store.writeQuery({ query: currentUserQuery, data });
      }
    })
    .then(res => {
      if(!res.data.login) {
        return this.props.flashError('Login Failed');
      }
      this.props.flashSuccess('Successfully logged in.');
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

const mapDispatchToProps = (dispatch) => ({
  requestRedirect: (location) => dispatch({type: 'REQUEST_REDIRECT', location}),
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg})
});

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
    }
  }
`;

export { LoginForm };
export default compose(
  graphql(loginMutation),
  connect(null, mapDispatchToProps)
)(LoginForm);
