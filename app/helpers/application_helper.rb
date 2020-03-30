# frozen_string_literal: true

module ApplicationHelper
  # Flash card name conversion helper
  def flash_class(level)
    case level
    when 'notice' then 'alert alert-info'
    when 'success' then 'alert alert-success'
    when 'error' then 'alert alert-error'
    when 'alert' then 'alert alert-error'
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
end
