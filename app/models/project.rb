# frozen_string_literal: true

class Project < ApplicationRecord
  has_many :members
  has_many :users, through: :members
end
