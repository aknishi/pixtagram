export const createBookmark = bookmark => (
  $.ajax({
    method: 'POST',
    url: 'api/bookmarks',
    data: { bookmark }
  })
);

export const deleteBookmark = bookmark => (
  $.ajax({
    method: 'DELETE',
    url: `api/bookmarks/${bookmark.id}`,
    data: bookmark
  })
);
