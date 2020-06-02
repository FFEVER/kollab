# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if user_signed_in?
      @user = current_user
      @projects = @user.following_projects
      @posts = Post.where(project: @projects).order('updated_at DESC')
      @serialized_posts = ActiveModel::Serializer::CollectionSerializer.new(@posts, each_serializer: PostSerializer)
    end
  end
end
