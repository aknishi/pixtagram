# == Schema Information
#
# Table name: likes
#
#  id            :bigint(8)        not null, primary key
#  liker_id      :integer          not null
#  likeable_id   :integer          not null
#  likeable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ApplicationRecord
  validates :likeable_id, uniqueness: { scope: :liker_id}

  belongs_to :liker, class_name: :User
  belongs_to :likeable, polymorphic: true
end
