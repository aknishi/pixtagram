import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
    this.props.history.push(`/login`);
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
          <li>
            <Link to={`/users/${currentUser.id}/notifications`}>
              <img src={window.heartURL} className="icon" alt="heart"/>
            </Link>
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
  render() {
    return (
      <div className="navbar-inner-container">
        <Link to="/posts" className="logo-container-link">
          <img src={window.cameraURL} className="camera-logo" alt="camera-logo"/>
          <h2 className="logo-text">Pixtagram</h2>
        </Link>
        <div>
          {this.navBarIcons()}
        </div>
      </div>
    )
  }
};

export default withRouter(NavBar);
