# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  body              :string           not null
#  author_id         :integer          not null
#  post_id           :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ApplicationRecord
  include Likeable

  after_create :create_notification

  validates :body, presence: true

  belongs_to :post
  belongs_to :author, class_name: :User

  has_many :replies,
    foreign_key: :parent_comment_id,
    class_name: :Comment

  def liked_by?(user)
    likes.exists?(liker_id: user.id)
  end

  private

  def create_notification
    post = Post.find(self.post_id)
    Notification.create(creator_id: self.author_id, receiver_id: post.user_id, post_id: self.post_id, notification_type: "comment")
  end

end
