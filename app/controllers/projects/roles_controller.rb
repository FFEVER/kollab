# frozen_string_literal: true

class Projects::RolesController < ApplicationController
  def show
    @role = Role.where(id: params[:id]).first
    if @role.nil?
      redirect_to :back
    end
    @serialized_role = RoleSerializer.new(@role)
    @project = @role.project
    @join_request = current_user.join_requests.where(project: @project).first
    @join_request = JoinRequestSerializer.new(@join_request) if @join_request
  end
end
