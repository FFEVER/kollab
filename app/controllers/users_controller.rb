# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, except: %i[edit update basic_info]
  before_action :custom_authenticate_user!
  skip_before_action :check_basic_info, only: %i[update basic_info]

  def show
    @projects = @user.projects
    @user.viewers << current_user if @user != current_user
    @posts = @user.posts.order('updated_at DESC').limit(3)
    @serialized_posts = ActiveModel::Serializer::CollectionSerializer.new(@posts, each_serializer: PostSerializer)

  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to profile_edit_path, notice: 'Profile was successfully updated.' }
        format.json { render json: @user, status: :ok, location: @user }
      else
        errors = helpers.errors_to_camel(@user.errors.messages)
        format.html { render :edit }
        format.json { render json: { messages: errors }, status: :unprocessable_entity }
      end
    end
  end

  def basic_info
    @user = current_user
    @faculty = @user.faculty.name || ''
  end

  def follow
    current_user.followings << @user
    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render json: {following: @user.followed_by?(current_user)}, status: :created }
    end
  end

  def unfollow
    current_user.unfollow(@user)
    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render json: {following: @user.followed_by?(current_user)}, status: :created }
    end
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
