# frozen_string_literal: true

class Projects::Settings::MembersController < ApplicationController

  def index
    @project = Project.find(params[:project])
    @members = @project.members
    @roles = @project.roles
    @waiting_requests = ActiveModel::Serializer::CollectionSerializer.new(
        @project.join_requests.waiting, each_serializer: JoinRequestSerializer)
    @inviting_requests = ActiveModel::Serializer::CollectionSerializer.new(
        @project.join_requests.inviting, each_serializer: JoinRequestSerializer)
  end

  def edit
    @member = Member.find(params[:id])
    @project = @member.project
    @user = @member.user
    @role = @member.role
    @serialized_member = MemberSerializer.new(@member)
    @roles = @member.project.roles
  end

  def update
    @member = Member.find(params[:id])
    @project = @member.project
    @role = Role.where(id: member_params[:role_id]).first

    respond_to do |format|
      if @member.update(is_owner: member_params[:is_owner], role: @role)
        format.html { redirect_to projects_settings_member_path, notice: 'Member was successfully updated.' }
        format.json {
          flash.notice = 'Member has been updated.'
          render json: @member, status: :ok, location: projects_settings_members_path(project: @project)
        }
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

  private

  def member_params
    params.require(:member).permit(:role_id, :is_owner)
  end
end
