json.post do
  json.partial! "api/posts/post", post: @post
  json.photoUrl url_for(post.photo)
end
