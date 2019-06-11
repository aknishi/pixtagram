import React from 'react';
import { withRouter } from 'react-router-dom';
import values from "lodash/values";

class PostGridItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { post } = this.props;
    this.props.history.push(`/users/posts/${post.id}`)
  }

  render() {
    const { post } = this.props;
    return (
      <div className="grid-item" onClick={this.handleClick}>
        {/*overlay of photo for animation with number of likes and comments*/}
        <div className="grid-item__overlay">
          <div className="grid-item__overlay__counts">
            <img src={window.whiteHeartURL} className="grid-item__overlay__icon" alt="likes" />
            <span><b>{post.likerIds.length}</b></span>
          </div>
          <div className="grid-item__overlay__counts">
            <img src={window.whiteCommentURL} className="grid-item__overlay__icon" alt="comments" />
            <span><b>{post.commentIds.length}</b></span>
          </div>
        </div>
        <img className="grid-item__photo" src={post.photoUrl} />
      </div>
    )
  }
}


export default withRouter(PostGridItem);
