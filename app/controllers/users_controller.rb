# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, except: %i[edit update]
  before_action :custom_authenticate_user!

  def show
    @projects = @user.projects
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
    permitted = params.require(:user).permit(:first_name, :last_name, :role, :faculty, :year, :skills, :profile_image, expertise_ids: [])
    permitted[:skills] = JSON.parse(permitted[:skills]) || []
    permitted
  end
end
