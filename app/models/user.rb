# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  name            :string           not null
#

class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :posts,
    foreign_key: :user_id

  has_many :likes,
    foreign_key: :liker_id

  has_many :bookmarks

  has_many :comments,
    foreign_key: :author_id

  has_one_attached :profile_photo

  has_many :in_follows,
    foreign_key: :followee_id,
    class_name: :Follow

  has_many :out_follows,
    foreign_key: :follower_id,
    class_name: :Follow

  has_many :followers,
    through: :in_follows,
    source: :follower

  has_many :followees,
    through: :out_follows,
    source: :followee

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def followed_user_ids
    @followed_user_ids ||= out_follows.pluck(:followee_id)
  end

  def follows?(user)
    followed_user_ids.include?(user.id)
  end

  def my_follow(current_user)
    if current_user
      in_follows.find_by(follower_id: current_user.id)
    else
      nil
    end
  end
end
