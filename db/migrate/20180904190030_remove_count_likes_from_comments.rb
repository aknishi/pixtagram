class RemoveCountLikesFromComments < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :like_count
  end
end
