export const createLike = like => (
  $.ajax({
    method: 'POST',
    url: 'api/likes',
    data: like
  })
);

export const deletelike = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/likes/${id}`
  })
);
