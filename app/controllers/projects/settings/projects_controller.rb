# frozen_string_literal: true

class Projects::Settings::ProjectsController < ApplicationController
  before_action :set_project, except: %i[index new create]

  def edit; end

  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to project_edit_path, notice: 'Profile was successfully updated.' }
        format.json { render json: @project, status: :ok, location: @project }
      else
        errors = helpers.errors_to_camel(@project.errors.messages)
        format.html { render :edit }
        format.json { render json: { messages: errors }, status: :unprocessable_entity }
      end
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
end
