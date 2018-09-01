import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class PostsIndexItem extends React.Component {
  constructor(props){
    super(props)

    this.navigateToUser = this.navigateToUser.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  navigateToUser() {
    const { user, post } = this.props
    this.props.history.push(`/users/${user.id}/`);
  }

  handleLike() {
    console.log("liked!");
  }

  handleDelete() {
    const { post, deletePost } = this.props;
    if (window.confirm('Are you sure you wish to delete this post?')) deletePost(post.id);
  }

  handleBookmark() {
    console.log("Bookmarked!");
  }

  deleteButton() {
    const { currentUserId, post } = this.props
    if (currentUserId === post.user_id) {
      return(
          <img src={window.deleteIconURL}
            className="icon" alt="delete"
            onClick={this.handleDelete.bind(this)}/>
      )
    } else {
      return (<div></div>)
    }
  }

  render() {
    const { post, user } = this.props

    return(
      <div className="post-index-container">
        <div className="post-header">
          <div className="post-author"onClick={this.navigateToUser}>
            <img className="small-profile-pic" src={window.defaultProfilePicURL}/>
            <div className="post-header-title">
              <h2 className="post-username" id="bold">{user.username}</h2>
              <h4 className="post-location">{post.location}</h4>
            </div>
          </div>
          { this.deleteButton() }
        </div>
        <div className="post-photo-container">
          <img className="post-full-photo" src={post.photoUrl}/>
        </div>
        <div className="bottom-block-container">
          <div className="post-icons">
            <div>
              <img src={window.heartURL} className="icon" alt="heart" onClick={this.handleLike}/>
              <img src={window.commentURL} className="icon" alt="comment"/>
            </div>
            <img src={window.bookmarkURL} className="icon" alt="bookmark" onClick={this.handleBookmark}/>
          </div>
          <h3 id="bold" className="total-likes">## Likes</h3>
          <div className="post-comments">
            <ul>
              <li>
                <div className="post-body-container">
                  <h3 id="bold">{user.username}</h3>
                  <h3 className="post-body">{post.body}</h3>
                </div>
              </li>
              <li>
                <div className="post-body-container">
                  <h3 id="bold">username</h3>
                  <h3 className="post-body">comments here...</h3>
                </div>
              </li>
            </ul>
            <h4 id="light-grey" className="post-time">{post.time_ago} ago</h4>
          </div>
          <input
            type="text"
            className="add-commment"
            placeholder="Add a comment..."
          />
        </div>
      </div>
    )
  }
}

export default withRouter(PostsIndexItem);
