# frozen_string_literal: true

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end
  # Keep database without records before all (not each) test run
  config.before(:all) do
    DatabaseCleaner.clean
  end
end
