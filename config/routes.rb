# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: %i[index show]

  get '/current', to: 'users#current'
  get '/logout', to: 'authentication#logout'
  post '/login', to: 'authentication#login'
  post '/signup', to: 'authentication#signup'
end
