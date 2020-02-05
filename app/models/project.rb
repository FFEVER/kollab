# frozen_string_literal: true

class Project < ApplicationRecord
  # TODO: [Anyone] Add full_desc
  has_many :members
  has_many :users, through: :members
  has_and_belongs_to_many :tags
end
