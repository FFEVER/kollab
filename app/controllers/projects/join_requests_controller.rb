# frozen_string_literal: true

class Projects::JoinRequestsController < ApplicationController

  def create
    project = Project.find(params[:project_id])
    if params[:status] == 'inviting'
      status = 'inviting'
      user = User.find(params[:user_id])
    else
      status = 'waiting'
      user = current_user
    end
    respond_to do |format|
      if project.users.include? user or user.projects_to_join.include? project
        format.html { redirect_to project, alert: 'You have already be or invited as a member' }
        format.json { render json: {message: 'You have already be or invited a member'}, status: :forbidden }
      else
        join_req = JoinRequest.create(user: user, project: project, status: status)
        join_req = JoinRequestSerializer.new(join_req)
        format.html { redirect_to project, notice: 'Request has been created' }
        format.json { render json: {join_request: join_req}, status: :created }
      end
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
    @join_request = JoinRequest.where(id: params[:id]).first
    return if @join_request.nil?

    req_id = @join_request.id
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
