class JoinRequestSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id

  belongs_to :user, serializer: UserSerializer
  belongs_to :project, serializer: ProjectSerializer

  attribute :links do
    id = object.id
    {
        'update': projects_join_request_path(id),
        'destroy': projects_join_request_path(id)
    }
  end
end
