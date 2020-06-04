# frozen_string_literal: true

class Projects::Settings::MembersController < ApplicationController
  before_action :set_member, except: %i[edit update]

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

  def update
    respond_to do |format|
      if @member.update(member_params)
        format.html { redirect_to projects_settings_member_path, notice: 'Member was successfully updated.' }
        format.json { render json: @member, status: :ok, location: @member }
      else
        errors = helpers.errors_to_camel(@member.errors.messages)
        format.html { render :edit }
        format.json { render json: { messages: errors }, status: :unprocessable_entity }
      end
    end
  end

  def set_member
    @member = Member.find(params[:id])
  end

  def member_params
    permitted = params.require(:member).permit(
      :role_id,
      :is_owner
    )
  end
end
