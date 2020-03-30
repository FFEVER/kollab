# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @owned_projects = @user.projects.owned
    @participated_projects = @user.projects.participated
    @following_projects = @user.following_projects
    @starring_projects = @user.starring_projects
    @page = params[:page]
  end
end
