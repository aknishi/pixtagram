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
    this.props.history.push(`/posts/${post.id}`)
  }

  render() {
    const { post } = this.props;
    return(
      <div className="grid-item" onClick={this.handleClick}>
        {/*overlay of photo for animation with number of likes and comments*/}
        <div className="photo-layer">
          <div className="counts">
            <img src={window.whiteHeartURL} className="layer-icon" alt="likes"/>
            <span><b>{post.likerIds.length}</b></span>
          </div>
          <div className="counts">
            <img src={window.whiteCommentURL} className="layer-icon" alt="comments"/>
            <span><b>{post.commentIds.length}</b></span>
          </div>
        </div>
        <img className="photo-grid-item" src={post.photoUrl}/>
      </div>
    )
  }
}


  export default withRouter(PostGridItem);
