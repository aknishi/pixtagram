export const fetchUsers = data => (
  $.ajax({
    method: 'GET',
    url: 'api/users',
    data
  })
);

export const fetchUser = id => (
  $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  })
);
