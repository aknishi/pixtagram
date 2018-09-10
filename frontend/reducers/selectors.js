import values from 'lodash/values';

export const selectUser = ({ users }, userId) => {
  return users[userId];
};

export const selectPost = ({ posts }, postId) => {
  return posts[postId];
};

export const selectPostsFromUser = ( posts, userId ) => {
  return values(posts).filter(post => post.user_id == userId);
}

export const selectSavedPostsFromUser = ( posts, user ) => {
  return values(posts).filter(post => user.bookmarkedPostIds.includes(post.id));
}

export const selectPostLikers = ( users, post ) => {
  const likers = post.likerIds.map(likerId => users[likerId])
  return values(likers);
}
