json.(project, :id, :title, :project_status, :created_at, :updated_at)

expertise_ids = project.categories_tree.map do |expertises|
  expertises.map { |expertise| expertise.id }
end
json.categories do
  json.array! expertise_ids
end

json.tags project.tags.map { |t| t.name }
