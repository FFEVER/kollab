# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    respond_to do |format|
      if @project.save
        @project.add_member current_user, is_owner: true
        format.json do
          render json: {
            redirect_url: url_for(@project)
          }, status: :created
        end
      else
        errors = helpers.errors_to_camel(@project.errors.messages)
        format.json do
          render json: { messages: errors }, status: :bad_request
        end
      end
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
