# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  body              :string           not null
#  author_id         :integer          not null
#  post_id           :integer          not null
#  parent_comment_id :integer
#  like_count        :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ApplicationRecord
  include Likeable

  validates :body, presence: true
  validates :like_count, numericality: {only_integer: true, minimum: 0}

  belongs_to :post
  belongs_to :author, class_name: :User

  def liked_by?(user)
    likes.exists?(liker_id: user.id)
  end
end
