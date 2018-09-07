import React from 'react';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import PostGridContainer from '../posts/post_grid_container';
import UnfollowWindow from './unfollow_window';

class UserShow extends React.Component {
  constructor(props) {
    super(props)

    this.showUnfollowWindow = this.showUnfollowWindow.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleEdit() {
    this.props.history.push(`/users/accounts/${this.props.userId}/edit`);
  }

  handleLogout() {
    this.props.logout().then(this.props.history.push(`/login`))
  }

  handleFollow() {
    const { currentUserId, userId, createFollow } = this.props;
    const follow = { follower_id: currentUserId, followee_id: userId }
    createFollow(follow);
  }

  showUnfollowWindow() {
    $('#unfollow-window').removeClass('hidden');
    $(document).on('click', this.hideWindow);
  }

  hideWindow() {
    $('#unfollow-window').addClass('hidden');
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId)
    this.props.fetchPosts();
    document.getElementById("focused").focus();
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

  followButtons() {
    const { currentUserId, userId, user } = this.props

    if (currentUserId != userId) {
      if (user.followerIds.includes(currentUserId)) {
        return(
          <div>
            <button
              onClick={this.showUnfollowWindow}
              className="edit-button">
              Following</button>
          </div>
        )
      } else {
        return(
          <div>
            <button
              onClick={this.handleFollow}
              className="button" id="follow-button">
              Follow</button>
          </div>
        )
      }
    }
  }

  render() {
    const { user, userPosts, deleteFollow} = this.props
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
              { this.followButtons()}
              <UnfollowWindow deleteFollow={deleteFollow} user={user} />
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
              <li><Link to={`/users/${this.props.userId}`} className="posts-navbar-links" id="focused" >POSTS</Link></li>
              <li><Link to={`/users/${this.props.userId}/saved`}className="posts-navbar-links">SAVED</Link></li>
              <li><Link to={`/users/${this.props.userId}/tagged`}className="posts-navbar-links">TAGGED</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserShow)
