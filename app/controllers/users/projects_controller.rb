# frozen_string_literal: true

class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @owned_projects = current_user.projects.owned
    @participated_projects = current_user.projects.participated
    @following_projects = current_user.following_projects
    @starring_projects = current_user.starring_projects
    @page = params[:page]
  end
end
