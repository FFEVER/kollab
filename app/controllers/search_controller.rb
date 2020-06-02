# frozen_string_literal: true

class SearchController < ApplicationController
  def index
    @word = params[:word]
    @type = params[:type]
    values = {word: "%#{@word}%"}
    user_conditions = 'users.first_name LIKE :word OR ' +
        'users.last_name LIKE :word OR ' +
        'users.description LIKE :word OR ' +
        'skills.name LIKE :word '
    @users = User.left_outer_joins(:skills).where(user_conditions, values).uniq
    @serialized_users = ActiveModel::Serializer::CollectionSerializer.new(@users, each_serializer: UserSerializer)
    @users_hash = serialized_users_to_hash(@serialized_users)

    project_conditions = 'projects.title LIKE :word OR ' +
        'projects.short_desc LIKE :word OR ' +
        'tags.name LIKE :word'
    @projects = Project.left_outer_joins(:tags).where(project_conditions, values).uniq
    @serialized_projects = ActiveModel::Serializer::CollectionSerializer.new(@projects, each_serializer: ProjectSerializer)
    @projects_hash = serialized_projects_to_hash(@serialized_projects)
  end

  def show; end

  def explore
    @projects = Project.all
    @serialized_projects = ActiveModel::Serializer::CollectionSerializer.new(@projects, each_serializer: ProjectSerializer)
    @projects_hash = serialized_projects_to_hash(@serialized_projects)

    @users = User.all
    @serialized_users = ActiveModel::Serializer::CollectionSerializer.new(@users, each_serializer: UserSerializer)
    @users_hash = serialized_users_to_hash(@serialized_users)
  end

  def trending; end

  private

  def search_params
    params.require(:search).permit(:word, :search_from)
  end

  def serialized_projects_to_hash(projects)
    projects_hash = []
    projects.each do |p|
      p_hash = p.serializable_hash
      p_hash[:starred] = true if p.object.starred_by?(current_user)
      projects_hash << p_hash
    end
    return projects_hash
  end

  def serialized_users_to_hash(users)
    users_hash = []
    users.each do |u|
      u_hash = u.serializable_hash
      u_hash[:following] = true if u.object.followed_by?(current_user)
      users_hash << u_hash
    end
    return users_hash
  end
end
