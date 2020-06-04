# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :name, :faculty, :description, :skills, :following, :profile_image_url

  def name
    "#{object.first_name} #{object.last_name}"
  end

  def faculty
    object.faculty.name
  end

  def skills
    object.skill_list
  end

  def following
    false
  end
end
