# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :store_user_location!, if: :storable_location?
  before_action :check_basic_info

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name])
  end

  def storable_location?
    request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
  end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end

  def after_sign_in_path_for(resource_or_scope)
    stored_location_for(resource_or_scope) || super
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

  def check_basic_info
    if user_signed_in? && !current_user.has_basic_info?
      redirect_to(basic_info_user_path(current_user))
    end
  end
end
