# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def new
    @project = Project.new
  end

  def create
    # TODO: [Eit] Create Member after project created
    # TODO: [Eit] Add Tag to Project
    @project = create_new_project_from_params
    if @project.save
      render json: {
        redirect_url: url_for(@project)
      }, status: :ok
    else
      errors = helpers.errors_to_camel(@project.errors.messages)
      render json: {
        errors: errors
      }, status: :ok
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
      :tags
    )
    permitted[:tags] = JSON.parse(permitted[:tags]) || []
    permitted
  end

  def create_new_project_from_params
    project = Project.new(
      title: project_params[:title],
      short_desc: project_params[:short_desc]
    )
    unless project_params[:start_date].blank?
      project.start_date = project_params[:start_date].to_date
    end
    unless project_params[:end_date].blank?
      project.end_date = project_params[:end_date].to_date
    end

    project
  end
end
