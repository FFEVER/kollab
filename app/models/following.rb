# frozen_string_literal: true

class Following < ApplicationRecord
  belongs_to :followable, polymorphic: true
  belongs_to :follower, foreign_key: :follower_id, class_name: 'User'
  validates_uniqueness_of :follower, scope: %i[followable_id followable_type]
end
