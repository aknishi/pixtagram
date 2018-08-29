class RemoveIndexfromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_index :posts, :user_id
  end
end
