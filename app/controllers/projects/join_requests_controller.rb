# frozen_string_literal: true

class Projects::JoinRequestsController < ApplicationController
  def create
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
    if @project.owners.include? current_user
      if @join_request.destroy
        render json: {join_request_id: req_id}, status: :ok
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
