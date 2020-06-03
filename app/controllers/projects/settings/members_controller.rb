# frozen_string_literal: true

class Projects::Settings::MembersController < ApplicationController
  def index
    project_id = params[:project]
    members = Member.where(project_id: project_id)
    @roles = []
    members.each do |member|
      user = User.find(member[:user_id])
      role = Role.find(member[:role_id])
      @roles << { member_id: member[:id], member: user, role: role }
    end
  end

  def edit
    @member = Member.find(params[:id])
    user = User.find(@member[:user_id])
    role = Role.find(@member[:role_id])
    @memberDetail = { member_id: @member[:id], member: user, role: role, is_owner: @member[:is_owner] }
    @roles = []

    members = Member.where(project_id: @member[:project_id])
    members.each do |member|
      role = Role.find(member[:role_id])
      @roles << role
    end
  end

  def update; end
end
