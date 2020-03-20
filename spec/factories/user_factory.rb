# frozen_string_literal: true

FactoryBot.define do
  # Generate fixture via FactoryBot
  factory :user do
    # Create a sequence of email. For example: test-001@sample.com
    sequence(:email) { |n| "test-#{n.to_s.rjust(3, '0')}@sample.com" }
    password { '123456' }
    first_name { Faker::Name.unique.first_name }
    last_name { Faker::Name.last_name }
  end
end
