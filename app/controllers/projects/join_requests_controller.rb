# frozen_string_literal: true

class Projects::JoinRequestsController < ApplicationController
  def create
    project = Project.find(params[:project_id])
    if project.users.include? current_user or current_user.projects_to_join.include? project
      redirect_to project, alert: 'You hav already be a member'
    else
      JoinRequest.create(user: current_user, project: project, status: 'waiting')
      redirect_to project, notice: 'Requested to join th team'
    end
  end

  def update
    @join_request = JoinRequest.find(params[:id])
    req_id = @join_request.id
    @project = @join_request.project

    if validate_user
      @project.add_member @join_request.user, is_owner: false
      if @join_request.destroy
        render json: {join_request_id: req_id}, status: :ok
      end
    else
      render json: {message: 'Unauthorize'}, status: :unauthorized
    end
  end

  def destroy
    @join_request = JoinRequest.find(params[:id])
    @project = @join_request.project
    if @project.owners.include? current_user or @join_request.user == current_user
      if @join_request.destroy
        respond_to do |format|
          format.html { redirect_to @project, notice: 'Request cancelled.' }
          format.json { render json: {join_request_id: req_id}, status: :ok }
        end
      end
    else
      render json: {message: 'Unauthorize'}, status: :unauthorized
    end
  end

  private

  def validate_user
    return @project.owners.include? current_user if @join_request.status == 'waiting'

    @join_request.user == current_user
  end

end
