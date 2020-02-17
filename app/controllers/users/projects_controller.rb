# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def new
    @project = Project.new
  end

  def create
    # TODO: [Eit] Create Member after project created
    # TODO: [Eit] Add Tag to Project
    @project = Project.new(
      title: project_params[:title],
      short_desc: project_params[:short_desc],
      start_date: project_params[:start_date],
      end_date: project_params[:end_date]
    )

    if @project.save
      render json: {
        message: 'Project has been created.'
      }, status: :ok
    else
      render json: {
        errors: @project.errors.messages
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
end
