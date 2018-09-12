export const fetchNotifications = () => (
  $.ajax({
    method: 'GET',
    url: 'api/notifications'
  })
);
