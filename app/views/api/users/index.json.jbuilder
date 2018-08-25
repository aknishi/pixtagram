@users.each do |user|
  json.set! user.id do
    json.partial! 'api/users/user', user: user
    json.postIds []
    json.commentIds []
  end
end
