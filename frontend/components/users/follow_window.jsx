import React from 'react';

class FollowWindow extends React.Component {
  constructor(props){
    super(props)
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }



  followButton(){
    const { currentUserId, user } = this.props;
    if (user.followerIds.includes(currentUserId)) {
      return(
        <button onClick={this.handleFollow}>Follow</button>
      )
    } else {
      return(
        <button id="red-text" onClick={this.handleUnfollow}>Unfollow</button>
      )
    }
  }

  hideWindow() {
    $('#unfollow-window').addClass('hidden');
  }

  render() {
    const { user } = this.props
    return(
      <div id="follow-window" className="hidden">
        <div className="follow-window-container">
          <div className="unfollow-profile-pic">
            <img id="profile-pic" src={window.defaultProfilePicURL}/>
          </div>
          <button id="red-text" onClick={this.handleUnfollow}>Unfollow</button>
          <button className="cancel-button" onClick={this.hideWindow}>Cancel</button>
        </div>
        <div className="dark-overlay"></div>
      </div>
    )
  }
}


export default FollowWindow;
