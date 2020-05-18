json.(user, :id, :email, :role, :faculty_id, :year)

expertise_ids = user.expertises_tree.map do |expertises|
  expertises.map { |expertise| expertise.id }
end
json.expertises do
  json.array! expertise_ids
end

json.skills user.skills.map { |s| s.name }