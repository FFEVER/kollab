# frozen_string_literal: true

class Projects::Settings::RolesController < ApplicationController
  def new
    @role = Role.new
    @project = Project.find(params[:project_id])
  end

  def create
    @role = Role.new(role_params)
    @project = @role.project
    if @role.save
      flash.notice = 'Role has been created.'
      render json: @role, location: projects_settings_members_path(project: @project.id), status: :created
    else
      errors = helpers.errors_to_camel(@role.errors.messages)
      render json: {messages: errors}, status: :bad_request
    end
  end

  def index; end

  def edit
    @role = Role.find(params[:id])
    @project = @role.project
    @serialized_role = RoleSerializer.new(@role)
  end

  def update
    @role = Role.find(params[:id])
    @project = @role.project
    respond_to do |format|
      if @role.update(role_params)
        flash.notice = 'Role has been updated.'
        format.html { redirect_to projects_settings_members_path(project: @project.id), notice: 'role was successfully updated.' }
        format.json { render json: @role, status: :ok, location: projects_settings_members_path(project: @project.id) }
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
