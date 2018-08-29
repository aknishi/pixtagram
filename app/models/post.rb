class Post < ApplicationRecord
  include ActionView::Helpers::DateHelper

  validate :ensure_photo

  has_one_attached :photo
  belongs_to :user

  def time_ago
    time_ago_in_words(self.created_at)
  end

  def ensure_photo
    unless self.photo.attached?
      errors[:posts] << "Photo must be attached"
    end
  end
end
