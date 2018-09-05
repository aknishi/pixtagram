@posts.each do |post|
  json.set! post.id do
    json.partial! "api/posts/post", post: post
    json.photoUrl url_for(post.photo)
    json.commentIds post.comments.pluck(:id)
    json.likerIds post.likers.pluck(:id)
    json.liked post.liked_by?(current_user.id)
    json.myLike post.current_user_like(current_user.id)
  end
end
