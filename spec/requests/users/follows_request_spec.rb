# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users::Follows', type: :request do
  describe 'GET /index' do
    it 'returns http success' do
      get '/users/follows/index'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    it 'returns http success' do
      post '/users/follows/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete '/users/follows/destroy'
      expect(response).to have_http_status(:success)
    end
  end
end
