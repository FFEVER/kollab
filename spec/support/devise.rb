# frozen_string_literal: true

require_relative './controller_macros'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Warden::Test::Helpers
  config.extend ControllerMacros, type: :controller
end
