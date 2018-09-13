import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import PostGridItem from './post_grid_item';
import UserShowContainer from '../users/user_show_container';

class PostGrid extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchPosts().then(() => dispatch(fetchNotifications()));
  }

  // create and empty object if num of posts is not multiple
  // of 3 so that items space out evenly
  emptyObject(userPosts) {
    if ((userPosts.length % 3) > 1) {
      return (
      <li className="empty-grid-item"></li>
      )
    }
  }

  postsIcon() {
    const { gridSelected } = this.props
    if (gridSelected) {
      return (
        <img className="posts-navbar-icon" src={window.gridSelectedIconURL}/>
      )
    } else {
      return(
        <img className="posts-navbar-icon" src={window.gridIconURL}/>
      )
    }
  }

  savedIcon() {
    const { savedSelected } = this.props
    if (savedSelected) {
      return (
        <img className="posts-navbar-icon" src={window.bookmarkedURL}/>
      )
    } else {
      return(
        <img className="posts-navbar-icon" src={window.bookmarkURL}/>
      )
    }
  }

  savedLink() {
    const { userId, currentUserId, savedCssId, savedItemBorder } = this.props;
    if (currentUserId === userId) {
      return (
        <li id={savedItemBorder}>
          {this.savedIcon()}
          <Link to={`/users/${this.props.userId}/saved`} className="posts-navbar-links" id={savedCssId} >SAVED</Link>
        </li>
      )
    }
  }

  render() {
    const {
      userPosts,
      userId,
      gridIcon,
      bookmarkIcon,
      postsCssId,
      postsItemBorder,
      loading
    } = this.props;
    {/*iterate from most current post to oldest*/}
    const postGridItems = userPosts.slice(0).reverse().map(
      post => <li key={post.id}> <PostGridItem post={post} /></li>)

    if (loading) return (<div></div>);
    return (
      <div>
        <div className="user-posts-container">
          <div className="posts-navbar">
            <ul>
              <li id={postsItemBorder}>
                {this.postsIcon()}
                <Link to={`/users/${this.props.userId}`} className="posts-navbar-links" id={postsCssId} >POSTS</Link>
              </li>
              { this.savedLink()}
            </ul>
          </div>
        </div>
        <div className="photo-grid-container">
          <ul className="photo-grid">
            {postGridItems}
            {this.emptyObject(userPosts)}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(PostGrid);
