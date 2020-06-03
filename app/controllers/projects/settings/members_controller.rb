# frozen_string_literal: true

class Projects::Settings::MembersController < ApplicationController
  def index
    project_id = params[:project]
    members = Member.where(project_id: project_id)
    @roles = []
    members.each do |member|
      user = User.find(member[:user_id])
      role = Role.find(member[:role_id])
      @roles << { member: user, role: role }
    end
  end

  def edit; end

  def update; end
end
