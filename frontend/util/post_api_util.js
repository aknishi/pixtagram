export const fetchPosts = data => (
  $.ajax({
    method: 'GET',
    url: 'api/posts',
    data
  })
);

export const fetchPost = id => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${id}`
  })
);

export const createPost = post => (
  $.ajax({
    method: 'POST',
    url: 'api/posts',
    data: { post }
  })
);
