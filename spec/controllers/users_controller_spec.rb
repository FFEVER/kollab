# frozen_string_literal: true

require 'rails_helper'
require 'support/devise'

RSpec.describe UsersController, type: :controller do
  login_user
  # context 'GET #show' do
  #   it 'returns http success' do
  #     get :show
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  # binding.pry
  it 'should have a current_user' do
    # note the fact that you should remove the "validate_session" parameter if this was a scaffold-generated controller
    expect(subject.current_user).to_not eq(nil)
  end
end
