# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :custom_authenticate_user!
  before_action :set_project, except: %i[index new create]

  def index
    @projects = Project.all
  end

  def show
    @members = @project.members
    @project.viewers << current_user
    @posts = @project.posts.order('updated_at DESC').limit(3)
    @serialized_posts = ActiveModel::Serializer::CollectionSerializer.new(@posts, each_serializer: PostSerializer)

    @projects = find_related_projects
    @serialized_projects = ActiveModel::Serializer::CollectionSerializer.new(@projects, each_serializer: ProjectSerializer)
    @projects_hash = serialized_projects_to_hash(@serialized_projects)

  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      @project.add_member current_user, is_owner: true
      render json: @project, location: project_path(@project), status: :created
    else
      errors = helpers.errors_to_camel(@project.errors.messages)
      render json: {messages: errors}, status: :bad_request
    end
  end

  def destroy; end

  def follow
    @project.followers << current_user
    redirect_to request.referrer
  end

  def unfollow
    @project.followers.delete(current_user)
    redirect_to request.referrer
  end

  def star
    @project.stars << current_user
    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render json: {starred: @project.starred_by?(current_user), count: @project.stars.count}, status: :created }
    end
  end

  def unstar
    @project.stars.delete(current_user)
    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render json: {starred: @project.starred_by?(current_user), count: @project.stars.count}, status: :created }
    end
  end

  private

  def project_params
    permitted = params.require(:project).permit(
        :title,
        :short_desc,
        :start_date,
        :end_date,
        :expertise_ids,
        :tag_list
    )
    if permitted[:expertise_ids]
      permitted[:expertise_ids] = JSON.parse(permitted[:expertise_ids]) || []
    end
    if permitted[:tag_list]
      permitted[:tag_list] = JSON.parse(permitted[:tag_list]) || []
    end
    permitted
  end

  def set_project
    @project = Project.find(params[:id])
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

  def find_related_projects
    begin
      response = helpers.get_related_projects(@project)
      puts JSON.pretty_generate(response)
    rescue => e
      logger.error e.message
      response = {
          'projects' => Project.all.limit(10).map { |p| p.id }
      }
    end

    # Convert ids to project objects
    related_projects = []
    project_ids = response['projects']
    project_ids.each do |id|
      project = Project.where(id: id).first
      # Filter out owned and non-exists projects and currently show projects
      if project and not current_user.projects.include? project and project != @project
        related_projects << project
      end
    end
    related_projects[0..3]
  end


end
