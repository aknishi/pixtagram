import * as APIUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_POST_ERRORS
})

export const fetchPosts = () => dispatch => (
  APIUtil.fetchPosts().then(posts => (
    dispatch(receivePosts(posts))
  ))
);

export const fetchPost = id => dispatch => (
  APIUtil.fetchPost(id).then(post => (
    dispatch(receivePost(post))
  ))
);

export const createPost = post => dispatch => (
  APIUtil.createPost(post).then(post => {
    dispatch(receivePost(post));
  }).fail(err => dispatch(receiveErrors(err.responseJSON)))
);

export const updatePost = post => dispatch => (
  APIUtil.updatePost(post).then(post => {
    dispatch(receivePost(post));
  }).fail(err => dispatch(receiveErrors(err.responseJSON)))
);
