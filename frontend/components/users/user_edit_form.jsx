import React from 'react';
import { withRouter } from 'react-router-dom';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = Object.assign({}, this.state)
    this.props.updateUser(user)
    .then(() => this.props.history.push(`/users/${user.id}`));
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  passwordField() {
    const { user } = this.props
    if (user.username !== "guest") {
      return(
        <div className="edit-row">
          <aside>
            <label>Password:</label>
          </aside>
          <input
            type="password"
            value={this.state.password}
            placeholder="******"
            onChange={this.update('password')}
            />
        </div>
      )
    }
  }

  guestUserEditErrorMessage() {
    const { user } = this.props
    if (user.username === "guest") {
      return(
        <h2 className="errors">You cannot edit the guest user profile.</h2>
      )
    }
  }

  available() {
    const { user } = this.props
    return (user.username === "guest");
  }

  buttonId() {
    const { user } = this.props
    return (user.username === "guest") ? "disabled-button" : "edit-profile-button";
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const { user } = this.props
    return(
      <div className="form-container">
        <form className="user-edit-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          { this.guestUserEditErrorMessage() }
          <div className="edit-form">
            <div className="edit-row">
              <aside>
                <img className="small-profile-pic" src={window.defaultProfilePicURL}/>
              </aside>
              <h3>{user.username}</h3>
            </div>
            <div className="edit-row">
              <aside>
                <label>Name:</label>
              </aside>
              <input
                type="text"
                value={this.state.name}
                placeholder={user.name}
                onChange={this.update('name')}
                disabled={this.available()}
                />
            </div>
            <div className="edit-row">
              <aside>
                <label>Username:</label>
              </aside>
              <input
                type="text"
                value={this.state.username}
                placeholder={user.username}
                onChange={this.update('username')}
                disabled={this.available()}
                />
            </div>
            <div className="edit-row">
              <aside>
                <label>Email:</label>
              </aside>
              <input
                type="text"
                value={this.state.email}
                placeholder={user.email}
                onChange={this.update('email')}
                disabled={this.available()}
                />
            </div>
            { this.passwordField() }
            <div>
              <input
                type="submit"
                value="Update Profile"
                id={this.buttonId()}
                className="button"
                disabled={this.available()}/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(UserEditForm)
