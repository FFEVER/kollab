# frozen_string_literal: true

class SearchController < ApplicationController
  def index
    @word = params[:word]
    @type = params[:type]
    values = {word: "%#{@word.downcase}%"}
    user_conditions = 'lower(users.first_name) LIKE :word OR ' +
        'lower(users.last_name) LIKE :word OR ' +
        'lower(users.description) LIKE :word OR ' +
        'lower(skills.name) LIKE :word'
    @users = User.left_outer_joins(:skills).where(user_conditions, values).uniq
    @serialized_users = ActiveModel::Serializer::CollectionSerializer.new(@users, each_serializer: UserSerializer)
    @users_hash = serialized_users_to_hash(@serialized_users)

    project_conditions = 'lower(projects.title) LIKE :word OR ' +
        'lower(projects.short_desc) LIKE :word OR ' +
        'lower(tags.name) LIKE :word'
    @projects = Project.left_outer_joins(:tags).where(project_conditions, values).uniq
    @serialized_projects = ActiveModel::Serializer::CollectionSerializer.new(@projects, each_serializer: ProjectSerializer)
    @projects_hash = serialized_projects_to_hash(@serialized_projects)
  end

  def explore
    @projects = find_recommended_projects
    @serialized_projects = ActiveModel::Serializer::CollectionSerializer.new(@projects, each_serializer: ProjectSerializer)
    @projects_hash = serialized_projects_to_hash(@serialized_projects)
  end

  def trending
    @projects = Project.joins(:received_views).group('projects.id').order('count(viewings) desc')
    @serialized_projects = ActiveModel::Serializer::CollectionSerializer.new(@projects, each_serializer: ProjectSerializer)
    @projects_hash = serialized_projects_to_hash(@serialized_projects)
  end

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
    projects_hash
  end

  def serialized_users_to_hash(users)
    users_hash = []
    users.each do |u|
      u_hash = u.serializable_hash
      u_hash[:following] = true if u.object.followed_by?(current_user)
      users_hash << u_hash
    end
    users_hash
  end

  def find_recommended_projects
    response = helpers.get_recommended_projects(current_user)
    puts JSON.pretty_generate(response)

    # Convert ids to project objects
    recommended_projects = []
    project_ids = response['projects']
    project_ids.each do |id|
      project = Project.where(id: id).first
      # Filter out owned and non-exists projects
      if project and not current_user.projects.include? project
        recommended_projects << project
      end
    end
    recommended_projects
  end

end
