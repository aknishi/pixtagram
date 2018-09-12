class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.integer :creator_id, null: false
      t.integer :receiver_id, null: false
      t.string :notification_type, null: false
      t.integer :post_id
      t.timestamps
    end
      add_index :notifications, :receiver_id
      add_index :notifications, :post_id
  end
end
