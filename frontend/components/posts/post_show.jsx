import React from 'react';
import { withRouter, BrowserHistory } from "react-router-dom";
import values from 'lodash/values';
import OptionsWindow from './options_window';

class PostShow extends React.Component {
  constructor(props){
    super(props)
    this.goBackHistory = this.goBackHistory.bind(this);
    this.commentList = this.commentList.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.likeButton = this.likeButton.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.showOptionsWindow = this.showOptionsWindow.bind(this);
    this.moreOptionsButton = this.moreOptionsButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.post.id);
  }

  goBackHistory() {
    this.props.history.goBack();
  }

  showOptionsWindow() {
    $('#options-window').removeClass('hidden');
    $(document).on('click', this.hideWindow);
  }

  hideWindow() {
    $('#options-window').addClass('hidden');
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
      const comment = {body: e.currentTarget.value, author_id: currentUserId, post_id: post.id }
      createComment(comment);
      e.currentTarget.value = "";
    }
  }

  handleBookmark() {
    const { post, createBookmark, deleteBookmark, currentUserId } = this.props
    if (!post.bookmarked) {
      const bookmark = {user_id: currentUserId, post_id: post.id};
      createBookmark(bookmark);
    } else {
      const bookmark = post.myBookmark
      deleteBookmark(bookmark);
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

  bookmarkButton() {
    const { post } = this.props;
    if (post.bookmarked) {
      return(
        <img src={window.bookmarkedURL} className="icon" alt="bookmarked" onClick={this.handleBookmark}/>
      )
    } else {
      return(
        <img src={window.bookmarkURL} className="icon" alt="bookmark" onClick={this.handleBookmark}/>
      )
    }
  }

  moreOptionsButton() {
    const { currentUserId, user } = this.props;
    if (currentUserId === user.id) {
      return(
        <img src={window.moreOptionsURL} className="icon" alt="more-options" onClick={this.showOptionsWindow}/>
      )
    }
  }

  commentList() {
    const { post, comments, users } = this.props
    if ( post.commentIds.length > 0 ) {
      const postComments = comments.filter(comment => post.commentIds.includes(comment.id));
      const commentItems = postComments.map(comment => (
        <li key={comment.id}>
          <div className="post-body-container">
            <h3 id="bold">{users[comment.author_id].username}</h3>
            <h3 className="post-body">{comment.body}</h3>
          </div>
        </li>))
      return(
        <ul>
          { commentItems }
        </ul>
      )
    }
  }

  render() {
    const { post, user, deletePost } = this.props;
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
              onClick={this.goBackHistory}/>
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
              </ul>
              <ul>
                {this.commentList()}
              </ul>
            </div>
            <div className="post-detail-bottom">
              <div className="post-detail-icons">
                <div>
                  {this.likeButton()}
                  <img src={window.commentURL} className="icon" alt="comment" onClick={this.handleCommentClick}/>
                </div>
                <div>
                  {this.moreOptionsButton()}
                  {this.bookmarkButton()}
                </div>
              </div>
              <h3 id="bold" className="total-likes">{post.likerIds.length} Likes</h3>
              <h4 id="light-grey" className="post-time">{post.time_ago} ago</h4>
              <input
                type="text"
                className="add-commment"
                id="add-comment"
                placeholder="Add a comment..."
                onKeyDown={this.handleComment}
                />
              <OptionsWindow deletePost={deletePost} post={post} user={user}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostShow);
