# frozen_string_literal: true

class Faculty < ApplicationRecord
  validates :name, presence: true, length: { within: 1..50 }
end
