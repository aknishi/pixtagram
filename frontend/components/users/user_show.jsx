import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserShow extends React.Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleEdit() {
    this.props.history.push(`/users/${this.props.userId}/edit`);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push(`/login`);
  }

  componentWillMount() {
    this.props.fetchUser(this.props.userId)
  }

  render() {
    const { user } = this.props
    return(
      <div className="user-profile-container">
        <div className="user-info-container">
          <div className="profile-pic-container">
            <div className="profile-pic">
              <img id="profile-pic" src={window.defaultProfilePicURL}/>
            </div>
          </div>
          <div className="user-info">
            <div className="username">
              <h2>{user.username}</h2>
              <button
                onClick={this.handleEdit}
                className="edit-button">
                Edit Profile</button>
              <button
                onClick={this.handleLogout}
                className="logout-button">
                Log out</button>
            </div>
            <h2>{user.name}</h2>
          </div>
        </div>
        <div className="user-posts-container">
          <div className="posts-navbar">
            <ul>
              <li><Link to={`/users/${this.props.userId}`} className="posts-navbar-links">POSTS</Link></li>
              <li><Link to={`/users/${this.props.userId}/tagged`}className="posts-navbar-links">TAGGED</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserShow)
