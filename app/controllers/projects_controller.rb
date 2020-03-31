# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :authenticate_user!, except: %i[index show]
  before_action :set_project, except: %i[index new create]

  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @members = @project.members
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      @project.add_member current_user, is_owner: true
      render json: @project, location: project_path(@project), status: :created
    else
      errors = helpers.errors_to_camel(@project.errors.messages)
      render json: { messages: errors }, status: :bad_request
    end
  end

  def edit; end

  def update; end

  def destroy; end

  def follow
    @project = Project.find_by_id(params[:id])
    @project.followers << current_user
    redirect_to request.referrer
  end

  def unfollow
    @project = Project.find_by_id(params[:id])
    @project.followers.delete(current_user)
    redirect_to request.referrer
  end

  def star
    @project = Project.find_by_id(params[:id])
    @project.stars << current_user
    redirect_to request.referrer
  end

  def unstar
    @project = Project.find_by_id(params[:id])
    @project.stars.delete(current_user)
    redirect_to request.referrer
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end
end
