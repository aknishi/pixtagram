# == Schema Information
#
# Table name: posts
#
#  id         :bigint(8)        not null, primary key
#  body       :text
#  location   :string
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  like_count :integer          default(0), not null
#

class Post < ApplicationRecord
  include ActionView::Helpers::DateHelper
  include Likeable
  validates :like_count, numericality: {only_integer: true, minimum: 0}
  validate :ensure_photo

  has_one_attached :photo

  belongs_to :user

  has_many :comments,
    foreign_key: :post_id

  def time_ago
    time_ago_in_words(self.created_at)
  end

  def ensure_photo
    unless self.photo.attached?
      errors[:posts] << "Photo must be attached"
    end
  end

  def liked_by?(user)
    likes.exists?(liker_id: user.id)
  end
end
