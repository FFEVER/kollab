# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def new
    @project = Project.new
  end

  def create
    # TODO: [Eit] Create Member after project created
    @project = helpers.create_new_project_from_params(project_params)
    if @project.save
      @project.add_member current_user, is_owner: true
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
      :tag_list
    )
    permitted[:tag_list] = JSON.parse(permitted[:tag_list]) || []
    permitted
  end
end
