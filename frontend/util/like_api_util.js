export const createLike = like => (
  $.ajax({
    method: 'POST',
    url: 'api/likes',
    data: { like }
  })
);

export const deleteLike = like => (
  $.ajax({
    method: 'DELETE',
    url: `api/likes/${like.id}`,
    data: like
  })
);
