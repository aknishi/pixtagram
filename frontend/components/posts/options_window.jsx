import React from 'react';
import { withRouter } from 'react-router-dom';

class OptionsWindow extends React.Component {
  constructor(props){
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { post, deletePost, user } = this.props;
    if (window.confirm('Are you sure you wish to delete this post?')) deletePost(post.id).then(
      this.props.history.push(`/users/${user.id}`)
    );
  }

  hideWindow() {
    $('#unfollow-window').addClass('hidden');
  }

  render() {
    const { user } = this.props
    return(
      <div id="options-window" className="hidden">
        <div className="options-window-container">
          <h2><b>Post Options</b></h2>
          <button id="red-text" onClick={this.handleDelete}>Delete Post</button>
          <button className="cancel-button" onClick={this.hideWindow}>Cancel</button>
        </div>
        <div className="dark-overlay"></div>
      </div>
    )
  }
}


export default withRouter(OptionsWindow);
