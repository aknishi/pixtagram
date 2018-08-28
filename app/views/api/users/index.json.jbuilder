@users.each do |user|
  json.set! user.id do
    json.partial! 'api/users/user', user: user
    json.photoUrl url_for(user.profile_photo)
    json.postIds []
    json.commentIds []
  end
end
