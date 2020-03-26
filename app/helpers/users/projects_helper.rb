# frozen_string_literal: true

module Users::ProjectsHelper
  def errors_to_camel(errors)
    new_errors = {}
    errors.each do |key, value|
      puts "#{key}, #{value}"
      new_errors[key.to_s.camelize(:lower)] = value
    end
    new_errors
  end
end
