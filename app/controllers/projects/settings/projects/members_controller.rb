# frozen_string_literal: true

class Projects::Settings::Projects::MembersController < ApplicationController
  before_action :set_project, except: %i[index new create]

  def index; end

  def show
    @project = Project.find(params[:id])
    @members = @project.members

    @project_members = []

    @members.each_with_index do |member, i|
      @project_members[i] = User.find(member[:user_id])
    end
  end

  def edit; end

  def update; end

  private

  def member_params
    permitted = params.require(:project).permit(
      :title,
      :short_desc,
      :start_date,
      :end_date,
      :expertise_ids,
      :tag_list
    )
    if permitted[:expertise_ids]
      permitted[:expertise_ids] = JSON.parse(permitted[:expertise_ids]) || []
    end
    if permitted[:tag_list]
      permitted[:tag_list] = JSON.parse(permitted[:tag_list]) || []
    end
    permitted
  end

  def set_project
    @project = Project.find(params[:id])
  end
end
