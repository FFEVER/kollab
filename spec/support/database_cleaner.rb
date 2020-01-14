# frozen_string_literal: true

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end
  # Keep database without records before every test run
  config.before(:all) do
    DatabaseCleaner.clean
  end
end
