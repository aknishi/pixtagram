@users.each do |user|
  json.set! user.id do
    json.partial! "api/users/user", user: user
    json.postIds []
    json.followerIds user.followers.pluck(:id)
    json.followingIds user.followees.pluck(:id)
    json.myFollow user.my_follow(current_user)
    json.bookmarkedPostIds user.bookmarks.pluck(:post_id)
  end
end
