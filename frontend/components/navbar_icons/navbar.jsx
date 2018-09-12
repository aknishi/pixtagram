import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import NotificationsDropdownContainer from './notifications_dropdown_container';
import UserSearch from './user_search';

class NavBar extends React.Component {

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.navigateToIndex = this.navigateToIndex.bind(this);
    this.handleNotifications = this.handleNotifications.bind(this);
  }

  handleClick() {
    this.props.logout();
    this.props.history.push(`/login`);
  }

  navigateToIndex() {
    this.props.history.push(`/posts`);
  }

  markedNotificationsAsRead() {
    const { notifications } = this.props
    const unreadNotifications = notifications.filter(notification => notification.read === false)
    unreadNotifications.map(notif => {
      const notification = Object.assign({}, notif)
      notification.read = true
      return (
        this.props.updateNotification({notification})
      )
    })
  }

  handleNotifications() {
    this.props.fetchNotifications();
    $('#notifications-dropdown').removeClass('hidden');
    $(document).on('click', this.hideDropdown)
    this.markedNotificationsAsRead();
  }

  hideDropdown() {
    $('#notifications-dropdown').addClass('hidden');
  }

  unreadNotifications(){
    const { notifications } = this.props;
    const unreadNotifications = notifications.filter(notification => notification.read === false)
    const count = unreadNotifications.length;
    if (count > 0) {
      return(this.displayNotificationCount(count));
    }
  }

  displayNotificationCount(count) {
    if (count < 10) {
      var stringCount= `0${count}`;
    } else {
      var stringCount= `${count}`;
    }
    return(
      <div className="notification-count">
        <h4>{stringCount}</h4>
      </div>
    )
  }

  navBarIcons() {
    const { currentUser } = this.props
    if (currentUser) {
      return(
        <ul className="icons-container">
          <li>
            <Link to={`/users/${currentUser.id}/upload`}>
              <img src={window.uploadURL} className="icon" alt="upload"/>
            </Link>
          </li>
          <li id="notifications-dropdown-btn" className="heart-button">
            <div onClick={this.handleNotifications}>
              <img src={window.heartURL} className="icon" alt="heart"/>
              {this.unreadNotifications()}
            </div>
            <NotificationsDropdownContainer/>
          </li>
          <li>
            <Link to={`/users/${currentUser.id}`}>
              <img src={window.profileURL} className="icon" alt="profile-page"/>
            </Link>
          </li>
        </ul>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
  searchBar() {
    const { currentUser, users } = this.props
    if (currentUser) {
      return(
        <UserSearch users={users} />
      )
    }
  }
  render() {
    return (
      <div className="navbar-inner-container">
        <div className="logo-container-link" onClick={this.navigateToIndex}>
          <img src={window.cameraURL} className="camera-logo" alt="camera-logo"/>
          <h2 className="logo-text">Pixtagram</h2>
        </div>
        {this.searchBar()}
        <div>
          {this.navBarIcons()}
        </div>
      </div>
    )
  }
};

export default withRouter(NavBar);
