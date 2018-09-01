@comments.each do |comment|
  json.set! comment.id do
    json.patial! 'api/comments/comment', comment: comment
    json.replyIds []
  end
end
