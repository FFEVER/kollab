# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :first_name, :last_name, :name, :faculty, :description, :skills, :following, :profile_image_url

  attribute :links do
    id = object.id
    {
        'show': user_path(id)
    }
  end

  def name
    "#{object.first_name} #{object.last_name}"
  end

  def faculty
    return '' if object.faculty.nil?

    object.faculty.name
  end

  def skills
    object.skill_list
  end

  def following
    false
  end
end
