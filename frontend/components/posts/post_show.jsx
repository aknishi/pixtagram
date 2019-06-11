import React from 'react';
import { withRouter, BrowserHistory } from "react-router-dom";
import values from 'lodash/values';
import OptionsWindow from './options_window';

class PostShow extends React.Component {
  constructor(props) {
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
    this.navigateToLikes = this.navigateToLikes.bind(this);
    this.profilePhoto = this.profilePhoto.bind(this);
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

  navigateToLikes() {
    const { post } = this.props
    this.props.history.push(`/users/posts/${post.id}/liked_by`);
  }

  heartAnimation(id) {
    document.querySelector(`#${id}`).className = "like-heart-container";
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        document.querySelector(`#${id}`).className = "like-heart-container appear";
      });
    });
  }

  handleLike(e) {
    const { post, createLike, deleteLike, currentUserId } = this.props
    if (!post.liked) {
      const like = { liker_id: currentUserId, likeable_id: post.id, likeable_type: "Post" };
      createLike(like);
      this.heartAnimation(e.target.id);
    } else {
      const like = post.myLike;
      deleteLike(like);
    }
  }

  handleComment(e) {
    const { currentUserId, createComment, post } = this.props
    if (e.keyCode == 13) {
      const comment = { body: e.currentTarget.value, author_id: currentUserId, post_id: post.id }
      createComment(comment);
      e.currentTarget.value = "";
    }
  }

  handleBookmark() {
    const { post, createBookmark, deleteBookmark, currentUserId } = this.props
    if (!post.bookmarked) {
      const bookmark = { user_id: currentUserId, post_id: post.id };
      createBookmark(bookmark);
    } else {
      const bookmark = post.myBookmark
      deleteBookmark(bookmark);
    }
  }

  likeButton() {
    const { post } = this.props;
    if (post.liked) {
      return (
        <img src={window.likedURL} className="icon" alt="liked" onClick={this.handleLike} />
      )
    } else {
      return (
        <img id={`like-heart-${post.id}`} src={window.heartURL} className="icon" alt="like" onClick={this.handleLike} />
      )
    }
  }

  bookmarkButton() {
    const { post } = this.props;
    if (post.bookmarked) {
      return (
        <img src={window.bookmarkedURL} className="icon" alt="bookmarked" onClick={this.handleBookmark} />
      )
    } else {
      return (
        <img src={window.bookmarkURL} className="icon" alt="bookmark" onClick={this.handleBookmark} />
      )
    }
  }

  moreOptionsButton() {
    const { currentUserId, user } = this.props;
    if (currentUserId === user.id) {
      return (
        <img src={window.moreOptionsURL} className="icon" alt="more-options" onClick={this.showOptionsWindow} />
      )
    }
  }

  commentList() {
    const { post, comments, users } = this.props
    if (post.commentIds.length > 0) {
      const postComments = comments.filter(comment => post.commentIds.includes(comment.id));
      const commentItems = postComments.map(comment => (
        <li key={comment.id}>
          <div className="post__body-container">
            <h3 className="bold">{users[comment.author_id].username}</h3>
            <h3 className="post__body">{comment.body}</h3>
          </div>
        </li>))
      return (
        <ul>
          {commentItems}
        </ul>
      )
    }
  }

  profilePhoto() {
    const { user } = this.props
    if (user.profilePhotoUrl !== "/api/users") {
      return (
        <img className="small-profile-pic" src={user.profilePhotoUrl} />
      )
    } else {
      return (
        <img className="small-profile-pic" src={window.defaultProfilePicURL} />
      )
    }
  }

  render() {
    const { post, user, deletePost } = this.props;
    return (
      <div className="post-detail__container">
        <div className="post-detail__photo-container">
          <div id={`like-heart-${post.id}`} className="like-heart-container">
            <img id={`like-heart-${post.id}`} src={window.bigWhiteHeartURL} alt="liked!" className="like-heart" />
          </div>
          <img className="post-detail__photo" src={post.photoUrl} />
        </div>
        <div className="post-detail__info">
          <div className="post-detail__header">
            <div className="post__author" onClick={this.navigateToUser}>
              {this.profilePhoto()}
              <div className="post__header-title">
                <h2 className="post__username bold">{user.username}</h2>
                <h4 className="post__location">{post.location}</h4>
              </div>
            </div>
            <img src={window.deleteIconURL}
              className="icon" alt="close"
              onClick={this.goBackHistory} />
          </div>
          <div className="post-detail__comments">
            <div className="post__comments">
              <div className="post__body-container">
                <h3 className="bold">{user.username}</h3>
                <h3 className="post__body">{post.body}</h3>
              </div>
              <ul>
                {this.commentList()}
              </ul>
            </div>
            <div className="post-detail__bottom">
              <div className="post-detail__icons">
                <div>
                  {this.likeButton()}
                  <img src={window.commentURL} className="icon" alt="comment" onClick={this.handleCommentClick} />
                </div>
                <div>
                  {this.moreOptionsButton()}
                  {this.bookmarkButton()}
                </div>
              </div>
              <h3 className="total-likes bold" onClick={this.navigateToLikes}>{post.likerIds.length} Likes</h3>
              <h4 className="post__time">{post.time_ago} ago</h4>
              <input
                type="text"
                className="add-commment"
                id="add-comment"
                placeholder="Add a comment..."
                onKeyDown={this.handleComment}
              />
              <OptionsWindow deletePost={deletePost} post={post} user={user} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostShow);
