# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :custom_authenticate_user!
  before_action :set_post, except: %i[index new create]

  def index
    @posts = Post.all
  end

  def show
  end

  def new
    @post = Post.new
  end

  def create
    @project = Project.find(params[:project_id])
    check_permission(@project, current_user)

    @post = Post.new(post_params)
    @post.user = current_user
    @post.project = @project
    if @post.save
      render json: @post, location: project_post_path(@post), status: :created
    else
      errors = helpers.errors_to_camel(@post.errors.messages)
      render json: {messages: errors}, status: :bad_request
    end
  end

  def edit
  end

  def update
    @project = Project.find(params[:project_id])
    check_permission(@project, current_user)
  end

  def destroy
    @post.destroy if current_user.posts.include? @post
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def check_permission(project, user)
    unless project.users.include? user
      render json: {messages: 'You have no permission.'}, status: :unauthorized
    end
  end
end
