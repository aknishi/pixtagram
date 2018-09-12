import React from 'react'
import { withRouter, Link } from 'react-router-dom';

class LikedBy extends React.Component {

  navigateToPosts() {
    this.props.history.push('/posts/');
  }

  goBackHistory() {
    this.props.history.goBack();
  }

  handleUnfollow(liker) {
    const { deleteFollow } = this.props;
    const follow = liker.myFollow;
    deleteFollow(follow);
  }

  handleFollow(liker) {
    const { currentUserId, createFollow } = this.props;
    const follow = { follower_id: currentUserId, followee_id: liker.id }
    createFollow(follow);
  }

  followButtons(liker) {
    const { currentUserId } = this.props
    if (currentUserId != liker.id) {
      if (liker.followerIds.includes(currentUserId)) {
        return(
          <div>
            <button
              onClick={this.handleUnfollow.bind(this, liker)}
              className="edit-button">
              Unfollow</button>
          </div>
        )
      } else {
        return(
          <div>
            <button
              onClick={this.handleFollow.bind(this, liker)}
              className="button" id="follow-button">
              Follow</button>
          </div>
        )
      }
    }
  }

  profilePhoto(liker) {
    if (liker.profilePhotoUrl !== "/api/users") {
      return(
        <img className="tiny-profile-pic" src={liker.profilePhotoUrl}/>
      )
    } else {
      return(
        <img className="tiny-profile-pic" src={window.defaultProfilePicURL}/>
      )
    }
  }

  render() {
    const { likers, createFollow, deleteFollow, currentUserId } = this.props;
    const likerItems = likers.map(liker => (
        <li key={liker.id} className="liker-item">
          <Link to={`/users/${liker.id}/`} className="likers-link">
            { this.profilePhoto(liker) }
            <div>
              <h2 className="liker-username" id="bold">{liker.username}</h2>
              <h2 className="liker-name">{liker.name}</h2>
            </div>
          </Link>
          {this.followButtons(liker)}
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
                onClick={this.goBackHistory.bind(this)}/>
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
