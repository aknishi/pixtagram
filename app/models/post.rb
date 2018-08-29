class Post < ApplicationRecord
  include ActionView::Helpers::DateHelper

  has_one_attached :photo
  belongs_to :user

  def time_ago
    time_ago_in_words(self.created_at)
  end
end
