# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    sessions: 'users/sessions'
  }
  resources :users, only: %i[show]

  namespace :users do
    resources :projects, only: %i[new create edit update destroy]
  end

  resources :projects, only: %i[index show]
end
