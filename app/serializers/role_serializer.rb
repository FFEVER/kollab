class RoleSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :members, :project, :skill_list
end
