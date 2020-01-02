# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:show]
  def show
    @user = User.find_by_id(params[:id])
  end

  def edit; end
end
