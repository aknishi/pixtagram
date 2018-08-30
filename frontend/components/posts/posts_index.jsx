import React from 'react';
import PostsIndexItem from './posts_index_item';

class PostsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
  }

  render() {
    const { posts, users, deletePost, currentUserId } = this.props;
    const postItems = posts.slice(0).reverse().map(post => (
      <PostsIndexItem
        key={post.id}
        post={post}
        user={users[post.user_id]}
        deletePost={deletePost}
        currentUserId={currentUserId}
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
