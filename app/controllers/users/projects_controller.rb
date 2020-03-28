# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @owned_projects = current_user.projects.owned
    @participated_projects = current_user.projects.participated
    @following_projects = current_user.following_projects
    @starring_projects = current_user.starring_projects
    @page = params[:page]
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
      render json: { messages: errors }, status: :bad_request
    end
  end

  def edit; end

  def update; end

  def destroy; end

  private

  def project_params
    permitted = params.require(:project).permit(
      :title,
      :short_desc,
      :start_date,
      :end_date,
      :tag_list
    )
    permitted[:tag_list] = JSON.parse(permitted[:tag_list]) || []
    permitted
  end
end
