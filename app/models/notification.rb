class Notification < ApplicationRecord
  include ActionView::Helpers::DateHelper

  TYPES = %w(follow comment like bookmark).freeze

  validates :creator_id, :receiver_id, presence: true
  validates :notification_type, inclusion: TYPES
  belongs_to :creator,
    class_name: :User
  belongs_to :receiver,
    class_name: :User

  def time_ago
    time_ago_in_words(self.created_at)
  end

end
