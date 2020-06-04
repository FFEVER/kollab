class MemberSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :user, :project, :is_owner, :role

  attribute :links do
    id = object.id
    {
        'edit': edit_projects_settings_member_path(id),
        'destroy': projects_settings_member_path(id)
    }
  end
end
