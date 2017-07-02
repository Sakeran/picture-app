import React from 'react';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: ''
    }
  }

  handleChange = field => e => {
    const change = {};
    change[field] = e.target.value;
    this.setState(change);
  }

  submit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="SignupPage">
        <h2>Signup</h2>
        <form>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange('username')} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange('password')} />
          </div>
          <div className="field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange('passwordConfirm')} />
          </div>
          <input type="submit" value="Sign Up" onClick={this.submit} />
        </form>
      </div>
    );
  }
}


export default Signup;
