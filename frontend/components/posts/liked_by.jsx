import React from 'react'
import { withRouter, Link } from 'react-router-dom';

class LikedBy extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
    this.props.fetchComments();
  }

  navigateToPosts() {
    this.props.history.push('/posts/');
  }

  render() {
    const { likers } = this.props;
    const likerItems = likers.map(liker => (
        <li key={liker.id} className="liker-item">
          <Link to={`/users/${liker.id}/`} className="likers-link">
            <img className="tiny-profile-pic" src={window.defaultProfilePicURL}/>
            <div>
              <h2 className="liker-username" id="bold">{liker.username}</h2>
              <h2 className="liker-name">{liker.name}</h2>
            </div>
          </Link>
        </li>
    ));
    return(
        <div>
          <div className="likers-container">
            <div className="likes-title">
              <div className="empty-div"></div>
              <h2>Likes</h2>
              <img src={window.deleteIconURL}
                className="close-icon" alt="close"
                onClick={this.navigateToPosts.bind(this)}/>
            </div>
            <ul className="likers-list">
              { likerItems }
            </ul>
          </div>
          <div className="dark-overlay"></div>
        </div>
    )
  }
}

export default withRouter(LikedBy);
