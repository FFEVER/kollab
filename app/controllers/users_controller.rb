# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[follow unfollow]
  def show
    @user = User.find_by_id(params[:id])
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
end
