import React from 'react';
import PostsIndexItem from './posts_index_item';
import LoadingIcon from './loading_icon';

class PostsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchComments();
    this.props.fetchPosts().then(() => dispatch(fetchNotifications()));
  }

  render() {
    const {
      posts,
      users,
      deletePost,
      fetchPost,
      currentUserId,
      loading,
      createLike,
      createComment,
      deleteLike,
      deleteComment,
      comments,
      createBookmark,
      deleteBookmark
      } = this.props;

    if (loading) { return <LoadingIcon />; }
    const postItems = posts.slice(0).reverse().map(post => (
        <PostsIndexItem
          key={post.id}
          post={post}
          user={users[post.user_id]}
          users={users}
          comments={comments}
          deletePost={deletePost}
          currentUserId={currentUserId}
          createLike={createLike}
          deleteLike={deleteLike}
          createComment={createComment}
          deleteComment={deleteComment}
          fetchPost={fetchPost}
          loading={loading}
          createBookmark={createBookmark}
          deleteBookmark={deleteBookmark}
          />
      ))
    return(
      <div>
        { postItems }
      </div>
    )
  }
}

export default PostsIndex;
