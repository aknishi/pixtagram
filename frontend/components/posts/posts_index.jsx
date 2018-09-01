import React from 'react';
import PostsIndexItem from './posts_index_item';
import LoadingIcon from './loading_icon';

class PostsIndex extends React.Component {

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
  }

  render() {
    const { posts, users, deletePost, currentUserId, loading } = this.props;

    if (loading) { return <LoadingIcon />; }

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
