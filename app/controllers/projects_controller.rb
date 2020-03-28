# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :authenticate_user!, except: %i[index show]
  before_action :set_project, except: :index

  def index
    @projects = Project.all
  end

  def show
    @members = @project.members
  end

  def follow
    @project.followers << current_user
    redirect_to request.referrer
  end

  def unfollow
    @project.followers.delete(current_user)
    redirect_to request.referrer
  end

  def star
    @project.stars << current_user
    redirect_to request.referrer
  end

  def unstar
    @project.stars.delete(current_user)
    redirect_to request.referrer
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end
end
