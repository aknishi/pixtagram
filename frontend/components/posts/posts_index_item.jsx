import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class PostsIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.navigateToUser = this.navigateToUser.bind(this);
    this.navigateToLikes = this.navigateToLikes.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.likeButton = this.likeButton.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.commentList = this.commentList.bind(this);
    this.profilePhoto = this.profilePhoto.bind(this);
  }

  navigateToUser() {
    const { user } = this.props
    this.props.history.push(`/users/${user.id}/`);
  }

  navigateToLikes() {
    const { post } = this.props
    this.props.history.push(`/posts/${post.id}/liked_by`);
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

  handleComment(e) {
    const { currentUserId, createComment, post } = this.props
    if (e.keyCode == 13) {
      const comment = { body: e.currentTarget.value, author_id: currentUserId, post_id: post.id }
      createComment(comment);
      e.currentTarget.value = "";
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

  handleDelete() {
    const { post, deletePost } = this.props;
    if (window.confirm('Are you sure you wish to delete this post?')) deletePost(post.id);
  }

  handleCommentClick() {
    const { post } = this.props;
    document.getElementById(`add-comment-${post.id}`).focus();
  }

  deleteButton() {
    const { currentUserId, post } = this.props
    if (currentUserId === post.user_id) {
      return (
        <img src={window.deleteIconURL}
          className="icon" alt="delete"
          onClick={this.handleDelete.bind(this)} />
      )
    } else {
      return (<div></div>)
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
    const { post, user } = this.props;

    return (
      <div className="post__index-container">
        <div className="post__header">
          <div className="post__author" onClick={this.navigateToUser}>
            {this.profilePhoto()}
            <div className="post__header-title">
              <h2 className="post__username bold">{user.username}</h2>
              <h4 className="post__location">{post.location}</h4>
            </div>
          </div>
          {this.deleteButton()}
        </div>
        <div className="post__photo-container" onDoubleClick={this.handleLike}>
          <div id={`like-heart-${post.id}`} className="like-heart-container">
            <img id={`like-heart-${post.id}`} src={window.bigWhiteHeartURL} alt="liked!" className="like-heart" />
          </div>
          <img className="post__full-photo" src={post.photoUrl} />
        </div>
        <div className="post__footer">
          <div className="post__icons">
            <div>
              {this.likeButton()}
              <img src={window.commentURL} className="icon" alt="comment" onClick={this.handleCommentClick} />
            </div>
            {this.bookmarkButton()}
          </div>
          <h3 className="total-likes bold" onClick={this.navigateToLikes}>{post.likerIds.length} Likes</h3>
          <div className="post__comments">
            <ul>
              <li>
                <div className="post__body-container">
                  <h3 className="bold">{user.username}</h3>
                  <h3 className="post__body">{post.body}</h3>
                </div>
              </li>
            </ul>
            {this.commentList()}
            <h4 className="post__time">{post.time_ago} ago</h4>
          </div>
          <input
            type="text"
            id={`add-comment-${post.id}`}
            className="add-commment"
            placeholder="Add a comment..."
            onKeyDown={this.handleComment}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(PostsIndexItem);
