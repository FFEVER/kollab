# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :custom_authenticate_user!
  before_action :set_post, except: %i[index new create]

  def index
    @posts = Post.all
  end

  def show
  end

  def create
    @project = Project.find(params[:project_id])
    return unless check_permission(@project, current_user)

    @post = Post.new(post_params)
    @post.user = current_user
    @post.project = @project
    if @post.save
      render json: @post, location: project_path(@project), status: :created
    else
      errors = helpers.errors_to_camel(@post.errors.messages)
      render json: {messages: errors}, status: :bad_request
    end
  end

  def edit
  end

  def update
    @project = Project.find(params[:project_id])
    return unless check_permission(@project, current_user)
    @post.update(:post_params)
  end

  def destroy
    if current_user.posts.include? @post
      if @post.destroy
        render json: {message: 'Removed'}, status: :ok
      end
    end
  end

  private

  def post_params
    params.require(:post).permit(:body)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def check_permission(project, user)
    unless project.users.include? user
      render json: {messages: {body: ['You have no permission.']}}, status: :unauthorized
      return false
    end
    return true
  end
end
