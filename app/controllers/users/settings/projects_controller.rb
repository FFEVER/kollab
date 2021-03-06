# frozen_string_literal: true

class Users::Settings::ProjectsController < ApplicationController
  def edit
    # @user = User.find(params[:user_id])
    @user = current_user
    @owned_projects = @user.projects.owned
    @participated_projects = @user.projects.participated
    @following_projects = @user.following_projects
    @starring_projects = @user.starring_projects
  end

  def update; end

  def destroy
    @project = Project.find(params[:project_id])
    if current_user.projects.include? @project
      if @project.destroy
        respond_to do |format|
          format.html { redirect_to edit_users_settings_project_path, notice: 'Project was successfully deleted.' }
          format.json { render json: @project, status: :ok, location: edit_users_settings_project_path(id: current_user[:id]) }
        end
      end
    end
  end

  def project_params
    permitted = params.require(:project).permit(
      :title,
      :short_desc,
      :long_desc,
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
end
