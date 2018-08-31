import React from 'react';
import { withRouter } from 'react-router-dom';

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
    return(
      <div onClick={this.handleClick}>
        //overlay of photo for animation with number of likes and comments
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
      </div>
    )
  }
}


  export default PostGridItem;
