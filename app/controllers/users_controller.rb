# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[show]

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    @user.update(user_params)
  end

  def follow
    @user = User.find_by_id(params[:id])
    current_user.followings << @user
    redirect_to @user
  end

  def unfollow
    @user = User.find_by_id(params[:id])
    current_user.unfollow(@user)
    redirect_to @user
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :profile_image)
  end
end
