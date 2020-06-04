class JoinRequestSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user, :project

  attribute :links do
    id = object.id
    {
        'update': projects_join_request_path(id),
        'destroy': projects_join_request_path(id)
    }
  end
end
