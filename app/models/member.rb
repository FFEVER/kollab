# frozen_string_literal: true

class Member < ApplicationRecord
  belongs_to :user
  belongs_to :project
  belongs_to :role, required: false

  validates_uniqueness_of :user_id, scope: [:project_id]

  def role_name
    if role && is_owner
      return "#{role.title} | Owner"
    elsif role
      return role.title
    elsif is_owner
      return 'Project Owner'
    else
      ''
    end
  end
end
