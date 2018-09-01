@posts.each do |post|
  json.set! post.id do
    json.partial! "api/posts/post", post: post
    json.photoUrl url_for(post.photo)
    post.comments.includes(:author).each do |comment|
      json.comments do
        json.set! comment.id do
          json.partial! 'api/comments/comment', comment: comment
        end
      end

      json.authors do
        json.set! comment.author.id do
          json.extract! comment.author, :id, :username
        end
      end
    end
  end
end
