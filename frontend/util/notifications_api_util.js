export const fetchNotifications = () => (
  $.ajax({
    method: 'GET',
    url: 'api/notifications'
  })
);

export const updateNotification = ({ notification }) => (
  $.ajax({
    method: 'PATCH',
    url: `api/notifications/${notification.id}`,
    data: { notification }
  })
);
