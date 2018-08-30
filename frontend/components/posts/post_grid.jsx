import React from 'react';

const PostGrid = (userPosts) => {
  const postGridItems = userPosts.userPosts.slice(0).reverse().map(
    post => (
    <li key={post.id} className="grid-item">
      <img className="photo-grid-item" src={post.photoUrl}/>
    </li>))
  return (
      <ul className="grid-container">
        {postGridItems}
      </ul>
  )
}

export default PostGrid;
