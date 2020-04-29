# frozen_string_literal: true

class Api::V1::UsersController < ApiController
  def index
    render json: 'hello'
  end
end
