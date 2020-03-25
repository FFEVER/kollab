# frozen_string_literal: true

class ProjectsController < ApplicationController
  def show
    @project = Project.find(params[:id])
    @members = @project.members
  end
end
