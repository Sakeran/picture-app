import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      message: ''
    };
  }

  handleChange = field => e => {
    const change = {};
    change[field] = e.target.value;
    this.setState(change);
  }

  submit = e => {
    e.preventDefault();
    this.setState({
      message: ''
    });
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

    username.length >= 0 ||
    addError('username', 'Username cannot be blank');

    username.indexOf(" ") === -1 ||
    addError('username', 'Username cannot contain spaces');

    password.length >= 0 ||
    addError('password', 'Password cannot be blank');


    return hasErrors ? errors : false;
  }

  send({username, password}) {
    this.props.sendFunc(username, password)
    .then(userData => {
      const user = JSON.parse(userData);
      if (!user) {
        this.setState({
          message: 'Invalid Username/Password Combination'
        });
        return;
      }
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
    if (this.props.user) {
      return <Redirect to="/" />
    }
    return (<form>
      {this.state.message && (
        <div className="form-message">
          <p>{this.state.message}</p>
        </div>
      )}
      {this.listErrors() || null}
      <div className={this.checkField('username')}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange('username')} />
      </div>
      <div className={this.checkField('password')}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange('password')} />
      </div>
      <input className="button" type="submit" value="Log In" onClick={this.submit} />
    </form>);
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
