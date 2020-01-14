# frozen_string_literal: true

require 'rails_helper'
require 'support/devise'

RSpec.describe ApplicationController, type: :controller do
  # binding.pry
  context 'Logged in' do
    login_user
    it 'should have a current_user' do
      # note the fact that you should remove the "validate_session" parameter if this was a scaffold-generated controller
      expect(subject.current_user).to_not eq(nil)
    end
  end
end
