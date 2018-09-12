import React from 'react';

class UnfollowWindow extends React.Component {
  constructor(props){
    super(props)
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.profilePhoto = this.profilePhoto.bind(this);
  }

  handleUnfollow() {
    const { deleteFollow, user } = this.props;
    const follow = user.myFollow;
    deleteFollow(follow);
  }

  hideWindow() {
    $('#unfollow-window').addClass('hidden');
  }

  profilePhoto() {
    const { user } = this.props
    if (user.profilePhotoUrl !== "/api/users") {
      return(
        <img id="profile-pic" src={user.profilePhotoUrl}/>
      )
    } else {
      return(
        <img id="profile-pic" src={window.defaultProfilePicURL}/>
      )
    }
  }

  render() {
    const { user } = this.props
    return(
      <div id="unfollow-window" className="hidden">
        <div className="unfollow-window-container">
          <div className="unfollow-profile-pic">
            { this.profilePhoto() }
          </div>
          <h3 className="unfollow-question">Unfollow @{user.username} ?</h3>
          <button id="red-text" onClick={this.handleUnfollow}>Unfollow</button>
          <button className="cancel-button" onClick={this.hideWindow}>Cancel</button>
        </div>
        <div className="dark-overlay"></div>
      </div>
    )
  }
}


export default UnfollowWindow;
