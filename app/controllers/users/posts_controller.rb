# frozen_string_literal: true

class Users::PostsController < ApplicationController
  before_action :custom_authenticate_user!
  before_action :set_post, except: %i[index new create]

  def index
    @user = User.find(params[:user_id])
    @posts = @user.posts.order('updated_at DESC')
    @serialized_posts = ActiveModel::Serializer::CollectionSerializer.new(@posts, each_serializer: PostSerializer)
  end

  private

  def post_params
    params.require(:post).permit(:body)
  end
end
