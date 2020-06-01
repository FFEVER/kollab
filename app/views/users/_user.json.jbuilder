json.(user, :id, :email, :role, :faculty_id, :year)

expertise_ids = user.expertises_tree.map do |expertises|
  expertises.map { |expertise| expertise.id }
end
json.fields do
  json.array! expertise_ids
end

json.skills user.skills.map { |s| s.name }

json.joined_projects user.projects.order('created_at DESC').map { |p| p.id }[0..2]

json.starred_projects user.favorites.order('created_at DESC').map { |f| f.project_id }[0..8]

json.followed_projects user.given_follows.where(followable_type: 'Project').order('created_at DESC').map { |gf| gf.followable_id }[0..8]

json.viewed_projects user.get_n_latest_unique_viewed(16)