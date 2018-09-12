import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      username: this.props.user.username,
      email: this.props.user.email,
      password: "",
      photoFile: null,
      photoUrl: null
     };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.profilePhoto = this.profilePhoto.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidlMount() {
    const { currentUserId } = this.props
    const { targetUserId } = parseInt(this.props.match.params.userId)
    if (currentUserId !== targetUserId) {
      this.props.history.push(`/users/${currentUserId}`)
    } else {
      this.props.fetchUser(this.props.match.params.userId);
    }
  }

  handleFile(e) {
    const file = e.currentTarget.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  preview() {
    if (this.state.photoUrl) {
      return(
        <div className="img-preview-container">
          <h3 className="preview-text"> Image Preview </h3>
          <img src={this.state.photoUrl} className="img-preview-upload"/>
        </div>
    )}
  }

  handleSubmit(e) {
    e.preventDefault()
    const { user } = this.props;
    const userId = user.id
    const formData = new FormData();
    formData.append('user[name]', this.state.name);
    formData.append('user[username]', this.state.username);
    formData.append('user[email]', this.state.email);
    formData.append('user[password]', this.state.password);
    formData.append('user[profile_photo]', this.state.photoFile);
    this.props.updateUser({ formData, userId }).then(
      () => this.props.history.push(`/users/${user.id}`));
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
            placeholder="Enter Password"
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

  checkPermission() {
    const { user, currentUserId } = this.props;
    if (user.id !== currentUserId) {
      this.props.history.push(`/users/${currentUserId}`);
    }
  }

  profilePhoto() {
    const { user } = this.props
    if (user.profilePhotoUrl !== "/api/users") {
      return(
        <img className="small-profile-pic" src={user.profilePhotoUrl}/>
      )
    } else {
      return(
        <img className="small-profile-pic" src={window.defaultProfilePicURL}/>
      )
    }
  }

  render() {
    const { user } = this.props;
    this.checkPermission();
    return(
      <div className="form-container">
        <form className="user-edit-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          { this.guestUserEditErrorMessage() }
          <div className="edit-form">
            <div className="edit-row">
              <aside className="small-profile-photo-container">
                {this.profilePhoto()}
              </aside>
              <h2 id="bold">{user.username}</h2>
            </div>
            <div className="edit-row">
              <div>
                <aside className="profile-photo-upload-label">
                  <label>Profile Photo:</label>
                </aside>
                <h3 id="not-bold">(Use a square photo for better quality)</h3>
              </div>
              <input
                type="file"
                className="file-input"
                onChange={this.handleFile}
                />
            </div>
            { this.preview() }
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
