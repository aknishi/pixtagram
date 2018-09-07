json.partial! "api/users/user", user: @user
json.followerIds @user.followers.pluck(:id)
json.followingIds @user.followees.pluck(:id)
json.myFollow @user.my_follow(current_user)
