# frozen_string_literal: true

class Api::V1::ProjectsController < ApiController
  def index
    @projects = Project.all
  end
end
