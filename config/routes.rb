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
    resources :posts, only: :index, controller: 'users/posts'
    member do
      post 'follow'
      post 'unfollow'
      get 'followers'
      get 'followings'
      get 'basic_info'
    end
  end

  get 'profile/edit', to: 'users#edit'
  get 'project/edit', to: 'projects#edit'

  match 'profile/update', to: 'users#update', via: %i[put patch]
  match 'project/update', to: 'projects/settings/projects#update', via: %i[put patch]

  resources :projects do
    member do
      post 'follow'
      post 'unfollow'
      post 'star'
      post 'unstar'
    end

    resources :posts
  end

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :users, only: %i[index]
      resources :projects, only: %i[index]
    end
  end

  namespace :projects do
    resources :roles, only: %i[show]
    resources :join_requests, only: %i[create accept destroy]

    namespace :settings do
      resources :projects, only: %i[edit update]
      resources :members, only: %i[index edit update destroy]
      resources :roles, only: %i[new create edit update destroy]
    end
  end

  namespace :users do
    namespace :settings do
      resources :users, only: %i[edit update]
      resources :projects, only: %i[edit update]
    end
  end

  resources :search, only: :index do
    collection do
      get 'explore'
      get 'trending'
    end
  end
end
