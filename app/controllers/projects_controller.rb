# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :authenticate_user!, only: %i[follow unfollow]
  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @members = @project.members
  end

  def follow; end

  def unfollow; end

  def star
    @project = Project.find_by_id(params[:id])
    @project.stars << current_user
    redirect_to @project
  end

  def unstar
    @project = Project.find_by_id(params[:id])
    @project.stars.delete(current_user)
    redirect_to @project
  end
end
