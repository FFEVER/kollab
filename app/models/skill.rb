# frozen_string_literal: true

class Skill < ApplicationRecord
  has_many :user_skills
  has_many :users, through: :user_skills

  validates :name, presence: true, length: { within: 1..25 }

  def to_s
    name
  end

  def self.get_skills
    Skill.all
  end
end
