# frozen_string_literal: true

class Projects::Settings::RolesController < ApplicationController
  def new
    @role = Role.new
    @project = Project.find(params[:project_id])
  end

  def create
    @role = Role.new(role_params)
    if @role.save
      render json: @role, location: projects_settings_members_path(project: @project.id), status: :created
    else
      errors = helpers.errors_to_camel(@role.errors.messages)
      render json: {messages: errors}, status: :bad_request
    end
  end

  def index; end

  def edit
    @role = Role.find(params[:id])
  end

  def update
    respond_to do |format|
      if @role.update(role_params)
        format.html { redirect_to projects_settings_members_path, notice: 'role was successfully updated.' }
        format.json { render json: @role, status: :ok, location: @role }
      else
        errors = helpers.errors_to_camel(@role.errors.messages)
        format.html { render :edit }
        format.json { render json: {messages: errors}, status: :unprocessable_entity }
      end
    end
  end

  def destroy; end

  private

  def role_params
    permitted = params.require(:role).permit(
        :title,
        :description,
        :status,
        :skill_list,
        :project_id
    )
    if permitted[:skill_list]
      permitted[:skill_list] = JSON.parse(permitted[:skill_list]) || []
    end
    permitted
  end

  def set_role
    @role = Role.find(params[:id])
  end


end
