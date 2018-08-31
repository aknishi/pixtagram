import React from 'react';
import { withRouter } from 'react-router-dom';
import PostGridItem from './post_grid_item';

class PostGrid extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchPosts();
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

  render() {
    const { userPosts } = this.props;
    //iterate from most current post to oldest
    const postGridItems = userPosts.slice(0).reverse().map(
      post => <li key={post.id}> <PostGridItem post={post} /></li>)

    return (
      <div className="photo-grid-container">
        <ul className="photo-grid">
          {postGridItems}
          {this.emptyObject(userPosts)}
        </ul>
      </div>
    )
  }
}

export default PostGrid;
