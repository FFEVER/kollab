# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name])
  end
  def custom_authenticate_user!
    if request.xhr?
      unless user_signed_in?
        render js: "window.location = '#{new_user_session_path}'"
      end
    else
      authenticate_user!
    end
  end
end
