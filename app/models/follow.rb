class Follow < ApplicationRecord
  after_create :create_notification

  validates :follower, uniqueness: { scope: :followee }

  belongs_to :followee,
    class_name: :User

  belongs_to :follower,
    class_name: :User

  private

  def create_notification
    Notification.create(creator_id: self.follower_id, receiver_id: self.followee_id, notification_type: "follow")
  end
end
