class Bookmark < ApplicationRecord
  after_create :create_notification

  validates :post_id, uniqueness: { scope: :user_id}

  belongs_to :user
  belongs_to :post

  private

  def create_notification
    post = Post.find(self.post_id)
    Notification.create(creator_id: self.user_id, receiver_id: post.user_id, post_id: self.post_id, notification_type: "bookmark")
  end

end
