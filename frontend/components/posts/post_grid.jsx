import React from 'react';

const PostGrid = (userPosts) => {
  const postGridItems = userPosts.userPosts.slice(0).reverse().map(
    post => (
    <li key={post.id} className="grid-item">
      <div className="photo-layer">
        <div className="counts">
          <img src={window.whiteHeartURL} className="layer-icon" alt="likes"/>
          <span>##</span>
        </div>
        <div className="counts">
          <img src={window.whiteCommentURL} className="layer-icon" alt="comments"/>
          <span>##</span>
        </div>
      </div>
      <img className="photo-grid-item" src={post.photoUrl}/>
    </li>))
  return (
      <ul className="grid-container">
        {postGridItems}
      </ul>
  )
}

export default PostGrid;
