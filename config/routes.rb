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

  resources :users, only: %i[show] do
    resources :projects, only: :index, controller: 'users/projects'
    member do
      post 'follow'
      post 'unfollow'
      get 'followers'
      get 'followings'
      get 'basic_info'
    end
  end

  get 'profile/edit', to: 'users#edit'
  match 'profile/update', to: 'users#update', via: %i[put patch]

  resources :projects do
    member do
      post 'follow'
      post 'unfollow'
      post 'star'
      post 'unstar'
    end
  end

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :users, only: %i[index]
      resources :projects, only: %i[index]
    end
  end

  resources :search, except: %i[new create edit update destroy] do
    collection do
      get 'explore'
      get 'trending'
    end
  end
end
