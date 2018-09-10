import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import values from 'lodash/values';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class PostsIndexItem extends React.Component {
  constructor(props){
    super(props)
    this.navigateToUser = this.navigateToUser.bind(this);
    this.navigateToLikes = this.navigateToLikes.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.likeButton = this.likeButton.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.commentList = this.commentList.bind(this);
  }

  navigateToUser() {
    const { user, post } = this.props
    this.props.history.push(`/users/${user.id}/`);
  }

  navigateToLikes() {
    const { post } = this.props
    this.props.history.push(`/posts/${post.id}/liked_by`);
  }

  handleLike() {
    const { post, createLike, deleteLike, currentUserId } = this.props
    if (!post.liked) {
      const like = {liker_id: currentUserId, likeable_id: post.id, likeable_type: "Post"};
      createLike(like);
    } else {
      const like = post.myLike;
      deleteLike(like);
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


  handleComment(e) {
    const { currentUserId, createComment, post } = this.props
    if (e.keyCode == 13){
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

  handleDelete() {
    const { post, deletePost } = this.props;
    if (window.confirm('Are you sure you wish to delete this post?')) deletePost(post.id);
  }


  handleCommentClick() {
    document.getElementById("add-comment").focus();
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
    const { post, user } = this.props;

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
        <div className="post-photo-container" onDoubleClick={this.handleLike}>
          <CSSTransitionGroup
            transitionName="like"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
              <img src={window.bigWhiteHeartURL} alt="liked!" className="like-heart"/>
          </CSSTransitionGroup>
          <img className="post-full-photo" src={post.photoUrl}/>
        </div>
        <div className="bottom-block-container">
          <div className="post-icons">
            <div>
              {this.likeButton()}
              <img src={window.commentURL} className="icon" alt="comment" onClick={this.handleCommentClick}/>
            </div>
            {this.bookmarkButton()}
          </div>
          <h3 id="bold" className="total-likes" onClick={this.navigateToLikes}>{post.likerIds.length} Likes</h3>
          <div className="post-comments">
            <ul>
              <li>
                <div className="post-body-container">
                  <h3 id="bold">{user.username}</h3>
                  <h3 className="post-body">{post.body}</h3>
                </div>
              </li>
            </ul>
            { this.commentList() }
            <h4 id="light-grey" className="post-time">{post.time_ago} ago</h4>
          </div>
          <input
            type="text"
            id="add-comment"
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
