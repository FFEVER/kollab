# frozen_string_literal: true

class Member < ApplicationRecord
  # TODO: [Anyone] Add role to Member
  belongs_to :user
  belongs_to :project
end
