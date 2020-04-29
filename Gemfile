# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.0'
# Use postgres as the database for Active Record
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 3.12'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Easily integrate react with rails
gem 'react-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Cross-Origin Resource Sharing
gem 'rack-cors'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'

# Paginate models without any configuration
gem 'kaminari'

# Model serializer
gem 'active_model_serializers', '~> 0.10.0'
# User management
gem 'devise'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

gem 'active_storage_validations'

gem 'aws-sdk-s3', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  # gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Nice console output :)
  gem 'awesome_print', require: 'ap'
  # Much bettet and more useful error page
  gem 'better_errors'
  # Full function of better_errors (REPL, local/instance variable inspection, pretty stack frame names)
  gem 'binding_of_caller'
  # Rails console with Pry
  gem 'pry-rails'
  # Rails debugger with Pry
  gem 'pry-byebug'
  # Alternative testing framework
  gem 'rspec-core', git: 'https://github.com/rspec/rspec-core'
  gem 'rspec-expectations', git: 'https://github.com/rspec/rspec-expectations'
  gem 'rspec-mocks', git: 'https://github.com/rspec/rspec-mocks'
  gem 'rspec-rails', git: 'https://github.com/rspec/rspec-rails'
  gem 'rspec-support', git: 'https://github.com/rspec/rspec-support'
  gem 'rails-controller-testing'
  # Code coverage analysis tool
  gem 'simplecov', require: false
  # Fixtures replacement
  gem 'factory_bot_rails'
  # Generate fake data in test suits
  gem 'faker'
  # Clean database efficiently in test suits
  gem 'database_cleaner'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  # Solargraph for autocompletion
  gem 'solargraph'
  # Rubocop for linting
  gem 'rubocop'
  # Erb autoformatting
  gem 'htmlbeautifier'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
