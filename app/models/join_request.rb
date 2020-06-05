# frozen_string_literal: true

class JoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :project

  STATUS = %w[waiting inviting]

  scope :waiting, -> { where('status = ?', 'waiting')}
  scope :inviting, -> { where('status = ?', 'inviting')}

  validates_uniqueness_of :user_id, scope: [:project_id]
end
