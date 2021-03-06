# frozen_string_literal: true

require 'rails_helper'
require 'support/devise'

RSpec.describe ApplicationController, type: :controller do
  context 'Logged in' do
    login_user
    it 'should have a current_user' do
      expect(subject.current_user).to_not eq(nil)
    end
  end
end
