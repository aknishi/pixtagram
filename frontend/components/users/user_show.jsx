import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PostGrid from '../posts/post_grid';

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

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId)
    this.props.fetchPosts()
  }

  currentUserButtons() {
    const { currentUserId } = this.props
    if (currentUserId == this.props.match.params.userId) {
      return(
        <div>
          <button
            onClick={this.handleEdit}
            className="edit-button">
            Edit Profile</button>
          <button
            onClick={this.handleLogout}
            className="logout-button">
            Log out</button>
        </div>
      )
    }
  }

  render() {
    const { user, userPosts } = this.props
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
              { this.currentUserButtons()}
            </div>
            <div className="user-stats">
              <h3><b>{userPosts.length}</b> posts</h3>
              <h3><b>XX</b> followers</h3>
              <h3><b>XX</b> following</h3>
            </div>
            <div><h2>{user.name}</h2></div>
          </div>
        </div>
        <div className="user-posts-container">
          <div className="posts-navbar">
            <ul>
              <li><Link to={`/users/${this.props.userId}`} className="posts-navbar-links">POSTS</Link></li>
              <li><Link to={`/users/${this.props.userId}/tagged`}className="posts-navbar-links">TAGGED</Link></li>
            </ul>
          </div>
          <div className="posts-grid">
            <PostGrid userPosts={userPosts}/>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserShow)
