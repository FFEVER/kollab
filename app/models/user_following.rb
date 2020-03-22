# frozen_string_literal: true

class UserFollowing < ApplicationRecord
  belongs_to :followed_user, foreign_key: :user_id, class_name: 'User'
  belongs_to :follower, foreign_key: :follower_id, class_name: 'User'
  validates_uniqueness_of :followed_user, scope: [:follower]
end
