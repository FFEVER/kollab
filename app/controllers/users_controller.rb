# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, except: %i[edit update basic_info]
  before_action :custom_authenticate_user!
  skip_before_action :check_basic_info, only: %i[update basic_info]

  def show
    @projects = @user.projects
    @user.viewers << current_user
    own = Member.where(user_id: current_user.id, is_owner: true)
    @own_projects = []
    own.each_with_index do |item, index|
      project = Project.find(item[:project_id])
      @own_projects[index] = project[:title]
    end
  end

  def basic_info
    @user = current_user
  end

  def follow
    current_user.followings << @user
    redirect_to request.referrer
  end

  def unfollow
    current_user.unfollow(@user)
    redirect_to request.referrer
  end

  def followers
    @followers = @user.followers
  end

  def followings
    @followings = @user.followings
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    permitted = params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :role,
      :faculty_id,
      :year,
      :expertise_ids,
      :skill_list,
      :profile_image,
      :description,
      :phone,
      :github,
      :linkedin,
      :facebook,
      :instagram,
      :medium
    )
    if permitted[:expertise_ids]
      permitted[:expertise_ids] = JSON.parse(permitted[:expertise_ids]) || []
    end
    if permitted[:skill_list]
      permitted[:skill_list] = JSON.parse(permitted[:skill_list]) || []
    end
    if permitted[:profile_image]
      permitted[:profile_image] = permitted[:profile_image] || []
    end
    permitted
  end
end
