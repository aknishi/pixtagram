import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const receiveComment = ({ comment, author }) => ({
  type: RECEIVE_COMMENT,
  comment,
  author
});

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_COMMENT_ERRORS
})

export const fetchComments = () => dispatch => (
  APIUtil.fetchComments().then(
    comments => dispatch(receiveComments(comments)))
);

export const createComment = comment => dispatch => (
  APIUtil.createComment(comment).then(
    comment => dispatch(receiveComment(comment)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteComment = comment => dispatch => (
  APIUtil.deleteComment(comment.id).then(() => (
    dispatch(removeComment(comment))
  ))
);
