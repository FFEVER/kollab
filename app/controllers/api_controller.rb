class ApiController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_action :ensure_json_request
  before_action :require_login!

  protected

  def ensure_json_request
    return if request.format == :json
    head :not_acceptable
  end

  def require_login!
    return true if authenticate_token
    render json: {errors: [{detail: "Access denied"}]}, status: 401
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      if token == Rails.application.credentials.kollab_data_key
        return true
      else
        return false
      end
    end
  end

end
