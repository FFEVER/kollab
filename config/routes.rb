# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  # TODO: [Eit] Add custom user controller for overiding devise views
  devise_for :users
end
