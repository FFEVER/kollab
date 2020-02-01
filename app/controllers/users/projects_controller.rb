# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def new
    @project = Project.new
  end

  def create
    # TODO: [Eit] Create Member and validates project
    @project = Project.new(project_params)
    if @project.save
      render json: {
        message: 'Project has been created.'
      }, status: :ok
    else
      render json: {
        message: 'Something went wrong.'
      }, status: :bad_request
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
end
