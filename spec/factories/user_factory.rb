# frozen_string_literal: true

# This file is boilerplate. You can use from anywhere in your spec file
FactoryBot.define do
  # Generate fixture via FactoryBot
  factory :user do
    # Create a sequence of email. For example: test-001@sample.com
    sequence(:email) { |n| "test-#{n.to_s.rjust(3, '0')}@sample.com" }
    password { '123456' }
    sequence(:first_name) { |n| "John#{n}" }
    sequence(:last_name) { |n| "Smith#{n}" }
  end
end
