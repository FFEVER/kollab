# frozen_string_literal: true

require "uri"
require "net/http"

module ApplicationHelper
  # Flash card name conversion helper
  def flash_class(level)
    case level
    when 'notice' then
      'alert alert-info'
    when 'success' then
      'alert alert-success'
    when 'error' then
      'alert alert-error'
    when 'alert' then
      'alert alert-error'
    end
  end

  def errors_to_camel(errors)
    new_errors = {}
    errors.each do |key, value|
      puts "#{key}, #{value}"
      new_errors[key.to_s.camelize(:lower)] = value
    end
    new_errors
  end

  def get_recommended_projects(user)
    if Rails.env.production?
      uri = URI.parse('https://kollab-data.herokuapp.com/api/v1/project_recommender/predict')
    else
      uri = URI.parse('http://localhost:8000/api/v1/project_recommender/predict')
    end

    header = {'Content-Type': 'application/json'}
    data = {user_id: user.id}

    # Create the HTTP objects
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true if Rails.env.production?
    request = Net::HTTP::Post.new(uri.request_uri, header)
    request.body = data.to_json

    # Send the request
    response = http.request(request)

    response_data = JSON.parse response.body
  end
end
