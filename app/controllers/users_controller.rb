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
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'Profile was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        errors = helpers.errors_to_camel(@user.errors.messages)
        format.html { render :edit }
        format.json { render json: { messages: errors }, status: :unprocessable_entity }
      end
    end
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
    params.require(:user).permit(:first_name, :last_name, :profile_image)
  end
end
