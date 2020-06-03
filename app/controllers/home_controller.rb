# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if user_signed_in?
      @user = current_user
      @following_projects = @user.following_projects
      @following_users = @user.followings
      @posts = Post.where(project: @following_projects).or(Post.where(user: @following_users)).order('updated_at DESC')
      @serialized_posts = ActiveModel::Serializer::CollectionSerializer.new(@posts, each_serializer: PostSerializer)
    end
  end
end
