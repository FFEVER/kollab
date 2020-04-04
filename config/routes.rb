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
  resources :users, only: %i[show edit update] do
    resources :projects, only: :index, controller: 'users/projects'
    member do
      post 'follow'
      post 'unfollow'
      get 'followers'
      get 'followings'
    end
  end

  resources :projects do
    member do
      post 'follow'
      post 'unfollow'
      post 'star'
      post 'unstar'
    end
  end
end
