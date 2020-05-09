# frozen_string_literal: true

class Faculty < ApplicationRecord
  has_many :users

  validates :name, presence: true, length: { within: 1..50 }
end
