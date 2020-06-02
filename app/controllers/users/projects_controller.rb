# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :custom_authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @owned_projects = @user.projects.owned.sort_by &:id
    @participated_projects = @user.projects.participated.sort_by &:id
    @following_projects = @user.following_projects.sort_by &:id
    @starring_projects = @user.starring_projects.sort_by &:id
    @page = params[:page]
  end
end
