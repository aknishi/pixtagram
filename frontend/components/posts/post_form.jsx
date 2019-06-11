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

  redirectToProfile() {
    const { currentUserId } = this.props
    this.props.history.push(`/users/${currentUserId}`)
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentUserId, createPost } = this.props
    const formData = new FormData();
    formData.append('post[body]', this.state.body);
    formData.append('post[location]', this.state.location);
    formData.append('post[photo]', this.state.photoFile);
    formData.append('post[user_id]', currentUserId);
    createPost(formData).then(setTimeout(() => { this.redirectToProfile() }, 2500));
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
      return (
        <div>
          <h3 className="post-form__preview-text"> Image Preview </h3>
          <img src={this.state.photoUrl} className="post-form__img-preview" />
        </div>
      )
    }
  }

  render() {

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <ul>
            {this.errors()}
          </ul>
          <h3 className="post-form__title">Create a post</h3>
          <div className="post-form">
            <input
              type="file"
              className="post-form__file"
              onChange={this.handleFile}
            />
            {this.preview()}
            <textarea
              type="text"
              className="post-form__body"
              value={this.state.body}
              placeholder="Write a caption..."
              onChange={this.update('body')}
            />
            <input
              type="text"
              value={this.state.location}
              placeholder="Location"
              className="post-form__location"
              onChange={this.update('location')}
            />
            <input type="submit" value="Create Post" className="button" />
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(PostForm)
