# frozen_string_literal: true

class Api::V1::UsersController < ApiController
  def index
    @expertises = Expertise.all
  end
end
