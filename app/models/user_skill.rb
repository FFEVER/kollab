# frozen_string_literal: true

class UserSkill < ApplicationRecord
  belongs_to :skill
  belongs_to :user

  def self.get_user_skills(id)
    UserSkill.find_by_user_id(id)
  end
end