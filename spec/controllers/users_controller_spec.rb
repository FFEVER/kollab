# frozen_string_literal: true

require 'rails_helper'
require 'support/devise'

RSpec.describe UsersController, type: :controller do
  login_user
  context 'GET #show' do
    it 'assigns @user to current_user' do
      get :show, params: { id: subject.current_user.id }
      expect(assigns(:user)).to eq(subject.current_user)
    end

    it 'returns http success' do
      get :show, params: { id: subject.current_user.id }
      expect(response).to have_http_status(:success)
    end
  end
end
