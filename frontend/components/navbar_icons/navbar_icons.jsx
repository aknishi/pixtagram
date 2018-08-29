import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavBarIcons extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
    this.props.history.push(`/login`);
  }

  render() {
    const { currentUser } = this.props
    if (currentUser) {
      return(
        <div className="icons-container">
          <div>
            <ul>
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
          </div>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
};

export default withRouter(NavBarIcons);
