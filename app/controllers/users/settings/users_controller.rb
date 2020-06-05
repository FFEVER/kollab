# frozen_string_literal: true

class Users::Settings::UsersController < ApplicationController
  def edit
    @user = current_user
  end

  def update
    binding.pry
    @user = current_user
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to edit_users_settings_user_path(id: @user[:id]), notice: 'Profile was successfully updated.' }
        format.json { render json: @user, status: :ok, location: @user }
      else
        errors = helpers.errors_to_camel(@user.errors.messages)
        format.html { render :edit }
        format.json { render json: { messages: errors }, status: :unprocessable_entity }
      end
    end
  end

  private

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
