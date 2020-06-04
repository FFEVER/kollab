# frozen_string_literal: true

class Projects::Settings::MembersController < ApplicationController
  # before_action :set_member, except: %i[edit update]

  def index
    @project = Project.find(params[:project])
    @members = @project.members
    @roles = @project.roles
  end

  def edit
    @member = Member.find(params[:id])
    @user = @member.user
    @role = @member.role
    @member_details = {member_id: @member.id, member: @user, role: @role, is_owner: @member.is_owner}
    @serialized_member = MemberSerializer.new(@member)
    @roles = @member.project.roles
  end

  def update
    respond_to do |format|
      if @member.update(member_params)
        format.html { redirect_to projects_settings_member_path, notice: 'Member was successfully updated.' }
        format.json { render json: @member, status: :ok, location: @member }
      else
        errors = helpers.errors_to_camel(@member.errors.messages)
        format.html { render :edit }
        format.json { render json: {messages: errors}, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @member = Member.find(params[:id])
    @project = @member.project
    if @project.owners.include? current_user
      if @project.members.count <= 1
        render json: {message: 'Cannot remove member since it is the last member.'}, status: :forbidden
      end
      if @member.destroy
        render json: {message: 'Removed'}, location: projects_settings_members_path(project: @project), status: :ok
      end
    end
  end

  # def set_member
  #   @member = Member.find(params[:id])
  # end

  def member_params
    permitted = params.require(:member).permit(
        :role_id,
        :is_owner
    )
    permitted
  end
end
