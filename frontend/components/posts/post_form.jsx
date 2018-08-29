import React from 'react';
import { withRouter } from 'react-router-dom';

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: "",
      location: "",
      photoFile: null,
      photoUrl: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleFile(e) {
    const file = e.currentTarget.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentUserId, createPost } = this.props
    const formData = new FormData();
    formData.append('post[body]', this.state.body);
    formData.append('post[location]', this.state.location);
    formData.append('post[photo]', this.state.photoFile);
    formData.append('post[user_id]', currentUserId);
    createPost(formData).then(this.props.history.push(`/users/${currentUserId}`));
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map(error => <li className='errors' key={error}>{error}</li>)
      );
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  preview() {
    if (this.state.photoUrl) {
      return(
        <div>
          <h3 className="preview-text"> Image Preview </h3>
          <img src={this.state.photoUrl} className="img-preview"/>
        </div>
    )}
  }

  render(){

    return (
      <div className="form-container">
        <form className="post-form-box" onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          <h3 className="post-form-title">Create a post</h3>
          <div className="post-form">
            <input
              type="file"
              className="file-input"
              onChange={this.handleFile}
              />
            { this.preview() }
            <textarea
              type="text"
              className="body-box"
              value={this.state.body}
              placeholder="Write a caption..."
              onChange={this.update('body')}
              />
            <input
              type="text"
              value={this.state.location}
              placeholder="Location"
              className="location-input"
              onChange={this.update('location')}
              />
            <input type="submit" value="Create Post" className="button"/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(PostForm)
