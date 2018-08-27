json.array! @posts do |post|
  json.extract! post, :id, :body, :location, :user_id
  json.photoUrl url_for(post.photo)
end
