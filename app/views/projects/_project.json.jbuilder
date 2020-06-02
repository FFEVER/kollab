json.(project, :id, :title, :project_status, :created_at, :updated_at)

expertise_ids = project.categories_tree.map do |expertises|
  expertises.map { |expertise| expertise.id }
end
json.fields do
  json.array! expertise_ids
end

json.tags project.tags.map { |t| t.name }

json.members project.members.order('created_at DESC').map { |m| m.user_id }

json.starred_by project.favorites.order('created_at DESC').map { |s| s.user_id }

json.followed_by project.received_follows.order('created_at DESC').map { |f| f.follower_id }

json.viewed_by project.get_n_latest_unique_viewed(16)
