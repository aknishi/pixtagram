class RemoveLikeCountfromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :like_count
  end
end
