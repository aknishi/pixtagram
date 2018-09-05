import * as APIUtil from '../util/post_api_util';
import * as likeAPIUtil from '../util/like_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';
export const START_LOADING_POSTS = "START_LOADING_POSTS";
export const START_LOADING_POST = "START_LOADING_POST";


export const startLoadingPosts = () => ({
  type: START_LOADING_POSTS
});

export const startLoadingPost = () => ({
  type: START_LOADING_POST
});

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

const removePost = id => ({
  type: REMOVE_POST,
  id
});

const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

const removeLike = like => ({
  type: REMOVE_LIKE,
  like
});


const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_POST_ERRORS
})

export const fetchPosts = () => dispatch => {
  dispatch(startLoadingPosts());
  return APIUtil.fetchPosts()
  .then(posts => { dispatch(receivePosts(posts))});
}

export const fetchPost = id => dispatch => {
  dispatch(startLoadingPost());
  return APIUtil.fetchPost(id)
  .then(post => { dispatch(receivePost(post));
  return post;
  });
}

export const createPost = post => dispatch => (
  APIUtil.createPost(post).then(
    post => dispatch(receivePost(post)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const deletePost = id => dispatch => (
  APIUtil.deletePost(id).then(() => (
    dispatch(removePost(id))
  ))
);

export const updatePost = post => dispatch => (
  APIUtil.updatePost(post).then(
    post => dispatch(receivePost(post)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const createLike = like => dispatch => (
  likeAPIUtil.createLike(like).then(
    like => dispatch(receiveLike(like)))
);

export const deleteLike = like => dispatch => (
  likeAPIUtil.deleteLike(like).then(
    like => dispatch(removeLike(like)))
);
