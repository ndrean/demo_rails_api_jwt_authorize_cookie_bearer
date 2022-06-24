# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: %i[index show]

  get '/current', to: 'users#current'
  get '/logout', to: 'authorization#logout'
  post '/login', to: 'authorization#login'
  post '/signup', to: 'authorization#signup'
end
