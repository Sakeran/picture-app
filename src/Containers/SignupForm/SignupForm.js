import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      errors: {}
    };
  }

  handleChange = field => e => {
    const change = {};
    change[field] = e.target.value;
    this.setState(change);
  }

  submit = e => {
    e.preventDefault();
    const errors = this.checkSubmission(this.state);
    if (errors) {
      return this.setState({errors});
    }
    this.send(this.state);
  }

  checkSubmission({username, password, passwordConfirm}) {
    const errors = {};
    let hasErrors = false;
    const addError = (field, msg) => {
      hasErrors = true;
      errors[field] = errors[field] ?
                      errors[field].push(msg)
                      : [msg];
    };

    username.length >= 3 ||
    addError('username', 'Username must be at least 3 characters');

    username.indexOf(" ") === -1 ||
    addError('username', 'Username cannot contain spaces');

    password.length >= 6 ||
    addError('password', 'Password must be at least 6 characters');

    password === passwordConfirm ||
    addError('passwordConfirm', 'Password and Confirmation must match.');


    return hasErrors ? errors : false;
  }

  send({username, password, passwordConfirm}) {
    this.props.sendFunc(username, password, passwordConfirm)
    .then(userData => {
      const user = JSON.parse(userData);
      console.log(user);
      this.props.loginUser(user);
    });
  };

  listErrors() {
    const errors = [];
    for (let field in this.state.errors) {
      this.state.hasOwnProperty(field) && errors.push(this.state.errors[field]);
    }
    return errors.length &&
           (
             <ul className="form-errors">
              {errors.map(err => <li key={err}>{err}</li>)}
             </ul>
           );
  }

  checkField = (fieldName) => {
    let res = 'field';
    this.state.errors[fieldName] && (res += ' has-errors');
    return res;
  }

  render() {
    return (<form>
      {this.listErrors() || null}
      <div className={this.checkField('username')}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange('username')} />
      </div>
      <div className={this.checkField('password')}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange('password')} />
      </div>
      <div className={this.checkField('passwordConfirm')}>
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange('passwordConfirm')} />
      </div>
      <input type="submit" value="Sign Up" onClick={this.submit} />
    </form>);
  }
}

SignupForm.propTypes = {
  sendFunc: PropTypes.func.isRequired,
  loginUser: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch({type: 'LOGIN_USER', user: user})
});

const ConnectedSignupForm = connect(null, mapDispatchToProps)(SignupForm);

export { ConnectedSignupForm };
export default SignupForm;
