import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import NotificationsDropdownContainer from './notifications_dropdown_container';

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

  handleNotifications() {
    $('#notifications-dropdown').removeClass('hidden');
    $(document).on('click', this.hideDropdown);
  }

  hideDropdown() {
    $('#notifications-dropdown').addClass('hidden');
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
            <img src={window.heartURL} className="icon" alt="heart" onClick={this.handleNotifications}/>
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
    const { currentUser } = this.props
    if (currentUser) {
      return(
        <div className="search">
          <span className="fa fa-search"></span>
          <input
            type="text"
            placeholder="Search"
            >
          </input>
        </div>
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
