class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :body, null:false
      t.integer :author_id, null:false
      t.integer :post_id, null:false
      t.integer :parent_comment_id
      t.integer :like_count, null:false

      t.timestamps
    end
    add_index :comments, :author_id
    add_index :comments, :post_id
    add_index :comments, :parent_comment_id
  end
end
