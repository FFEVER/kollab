# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :taggings
  has_many :projects, through: :taggings

  def to_s
    name
  end
end
