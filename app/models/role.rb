# frozen_string_literal: true

class Role < ApplicationRecord
  belongs_to :project

  has_many :members

  has_and_belongs_to_many :expertises
  has_and_belongs_to_many :skills

  def skill_list
    skills.join(' ').split(' ')
  end

  def skill_list=(skills_array)
    skill_names = skills_array.uniq[0..2]
    new_or_found_skills = skill_names.collect { |name| Skill.find_or_create_by(name: name) }
    self.skills = new_or_found_skills
  end

end
