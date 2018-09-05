import React from 'react';
import { withRouter } from "react-router-dom";
import values from 'lodash/values';

class PostShow extends React.Component {
  constructor(props){
    super(props)
    this.navigateToUser = this.navigateToUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.commentList = this.commentList.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.likeButton = this.likeButton.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.post.id);
  }

  navigateToUser() {
    const { user, post } = this.props
    this.props.history.push(`/users/${user.id}/`);
  }

  handleDelete() {
    const { post, deletePost } = this.props;
    if (window.confirm('Are you sure you wish to delete this post?')) deletePost(post.id);
  }

  handleCommentClick() {
    document.getElementById("add-comment").focus();
  }

  handleLike() {
    const { post, createLike, deleteLike, currentUserId } = this.props
    if (!post.liked) {
      const like = {liker_id: currentUserId, likeable_id: post.id, likeable_type: "Post"};
      createLike(like);
      post.liked = !post.liked
    } else {
      const like = post.myLike;
      deleteLike(like);
      post.liked = !post.liked
    }
  }

  handleComment(e) {
    const { currentUserId, createComment, post } = this.props
    if (e.keyCode == 13){
      console.log("comment posted");
      const comment = {body: e.currentTarget.value, author_id: currentUserId, post_id: post.id }
      createComment(comment);
      e.currentTarget.value = "";
    }
  }

  likeButton() {
    const { post } = this.props;
    if (post.liked) {
      return(
        <img src={window.likedURL} className="icon" alt="liked" onClick={this.handleLike}/>
      )
    } else {
      return(
        <img src={window.heartURL} className="icon" alt="like" onClick={this.handleLike}/>
      )
    }
  }

  commentList() {
    const { post } = this.props
    const commentArr = values(post.comments)
    if ( commentArr.length > 0 ) {
      return(
        commentArr.map(comment => (
          <div key={comment.id} className="post-body-container">
            <h3 id="bold">{post.authors[comment.author_id].username}</h3>
            <h3 className="post-body">{comment.body}</h3>
          </div>))
      )
    }
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
            <img src={window.deleteIconURL}
              className="icon" alt="close"
              onClick={this.navigateToUser}/>
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
                  {this.commentList()}
                </li>
              </ul>
            </div>
            <div className="post-detail-bottom">
              <div className="post-detail-icons">
                <div>
                  {this.likeButton()}
                  <img src={window.commentURL} className="icon" alt="comment" onClick={this.handleCommentClick}/>
                </div>
                <img src={window.bookmarkURL} className="icon" alt="bookmark" onClick={this.handleBookmark}/>
              </div>
              <h3 id="bold" className="total-likes">{post.likeIds.length} Likes</h3>
              <h4 id="light-grey" className="post-time">{post.time_ago} ago</h4>
              <input
                type="text"
                className="add-commment"
                id="add-comment"
                placeholder="Add a comment..."
                onKeyDown={this.handleComment}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostShow);
