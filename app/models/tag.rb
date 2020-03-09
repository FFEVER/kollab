# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :taggings
  has_many :projects, through: :taggings

  validates :name, presence: true, length: { within: 1..25 }

  def to_s
    name
  end
end
