import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.login(user);
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render(){
    return (
      <div className="form-container">
        <form className="login-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          <h3 className="form-title">Pixtagram</h3>
          <div className="login-form">
            <br/>
            <input
              type="text"
              value={this.state.username}
              placeholder="Username"
              onChange={this.update('username')}
              />
            <br/>
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.update('password')}
              />
            <br/>
            <input type="submit" value="Log In" className="button"/>
          </div>
        </form>
        <div className="reroute-session">
          <h3>Don't have an account?  {this.props.navLink}</h3>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)
