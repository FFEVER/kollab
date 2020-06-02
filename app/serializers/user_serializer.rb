class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :faculty, :description, :skills, :following

  def name
    "#{self.object.first_name} #{self.object.last_name}"
  end

  def faculty
    self.object.faculty.name
  end

  def skills
    self.object.skill_list
  end

  def following
    false
  end
end
