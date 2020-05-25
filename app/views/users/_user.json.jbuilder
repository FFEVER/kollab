json.(user, :id, :email, :role, :faculty_id, :year)

expertise_ids = user.expertises_tree.map do |expertises|
  expertises.map { |expertise| expertise.id }
end
json.expertises do
  json.array! expertise_ids
end

json.skills user.skills.map { |s| s.name }

json.members user.projects.order('created_at DESC').map { |p| p.id }

json.starred_projects user.favorites.order('created_at DESC').map { |f| f.project_id }

json.followed_projects user.given_follows.where(followable_type: 'Project').order('created_at DESC').map { |gf| gf.followable_id }

