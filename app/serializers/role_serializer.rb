class RoleSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :status, :members, :project, :skill_list

  attribute :links do
    id = object.id
    {
        'destroy': projects_settings_role_path(id)
    }
  end
end
