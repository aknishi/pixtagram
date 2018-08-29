import React from 'react';
import PostsIndexItem from './posts_index_item';

class PostsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
  }

  render() {
    const { posts, users } = this.props;
    const postItems = posts.slice(0).reverse().map(post => <PostsIndexItem key={post.id} post={post} user={users[post.user_id]} />)
    return(
      <div>
        { postItems }
      </div>
    )
  }
}

export default PostsIndex;
