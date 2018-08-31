import React from 'react';
import { withRouter } from "react-router-dom";

class PostShow extends React.Component {
  constructor(props){
    super(props)
    this.navigateToUser = this.navigateToUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.post.id);
  }

  navigateToUser() {
    const { user, post } = this.props
    this.props.history.push(`/users/${user.id}/posts`);
  }

  handleDelete() {
    const { post, deletePost } = this.props;
    if (window.confirm('Are you sure you wish to delete this post?')) deletePost(post.id);
  }

  render() {
    const { post, user } = this.props;
    return(
      <div className="post-detail-container">
        <div className="post-detail-photo">
          <img src={post.photoUrl}/>
        </div>
        <div className="post-detail-info">
          <div className="post-detail-header">
            <div className="post-author"onClick={this.navigateToUser}>
              <img className="small-profile-pic" src={window.defaultProfilePicURL}/>
              <div className="post-header-title">
                <h2 className="post-username" id="bold">{user.username}</h2>
                <h4 className="post-location">{post.location}</h4>
              </div>
            </div>
          </div>
          <div className="post-detail-comments">
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
            </div>
            <div className="post-detail-bottom">
              <div className="post-detail-icons">
                <div>
                  <img src={window.heartURL} className="icon" alt="heart" onClick={this.handleLike}/>
                  <img src={window.commentURL} className="icon" alt="comment"/>
                </div>
                <img src={window.bookmarkURL} className="icon" alt="bookmark" onClick={this.handleBookmark}/>
              </div>
              <h3 id="bold" className="total-likes">## Likes</h3>
              <h4 id="light-grey" className="post-time">{post.time_ago} ago</h4>
              <input
                type="text"
                className="add-commment"
                placeholder="Add a comment..."
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostShow);
