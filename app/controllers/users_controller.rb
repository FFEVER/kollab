# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :custom_authenticate_user!, only: %i[follow unfollow]
  before_action :set_user

  def show
    @user = User.find_by_id(params[:id])
    @projects = @user.projects
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
end
