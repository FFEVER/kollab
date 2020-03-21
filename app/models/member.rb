# frozen_string_literal: true

class Member < ApplicationRecord
  # TODO: [Anyone] Add role to Member
  belongs_to :user
  belongs_to :project
  validates_uniqueness_of :user_id, scope: [:project_id]
end
