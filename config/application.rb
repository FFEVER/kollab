require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Kollab
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Cross-Origin Resource Sharing config
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins /\Ahttps:\/\/kollab-data\.herokuapp\.com\z/, /\Alocalhost:\d\d\d\d\z/, /\A127\.0\.0\.1:\d\d\d\d\z/
        resource '*', headers: :any, methods: [:get, :post, :options]
      end
    end
  end
end
