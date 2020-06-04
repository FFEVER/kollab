# frozen_string_literal: true

class Projects::Settings::RolesController < ApplicationController
  def new
    @role = Role.new
end

  def create
    @role = Role.new(role_params)
    if @role.save
      render json: @role, location: project_settings_role_path(id(@role[:id])), status: :created
    else
      errors = helpers.errors_to_camel(@role.errors.messages)
      render json: { messages: errors }, status: :bad_request
    end
  end

  def index; end

  def edit; end

  def update
    respond_to do |format|
      if @role.update(role_params)
        format.html { redirect_to projects_settings_members_path, notice: 'role was successfully updated.' }
        format.json { render json: @role, status: :ok, location: @role }
      else
        errors = helpers.errors_to_camel(@role.errors.messages)
        format.html { render :edit }
        format.json { render json: { messages: errors }, status: :unprocessable_entity }
      end
    end
  end

  def set_role
    @role = Role.find(params[:id])
  end

  def role_params
    permitted = params.require(:role).permit(
      :title,
      :description,
      :status
    )
    permitted
  end

  private

  def destroy; end
end
