# frozen_string_literal: true

class Users::NotificationsController < ApplicationController
  before_action :custom_authenticate_user!

  def index
    @user = current_user
    join_requests = @user.join_requests.inviting
    @join_requests = ActiveModel::Serializer::CollectionSerializer.new(
        join_requests, each_serializer: JoinRequestSerializer)
  end

end
