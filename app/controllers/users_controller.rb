# frozen_string_literal: true

# user controller actions are protected by authnetification except the creation!
class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  before_action :set_user, only: %i[show destroy]

  include JwtWebToken

  def index
    users = User.all
    render(json: { users: }, status: :ok)
  end

  def create
    User.create!(user_params)
  end

  def current
    jwt = decode(cookies.signed[:jwt])
    render(json: { jwt: }, status: :ok)
  end

  def show
    render(json: { error: 'not found' }, status: 404) unless @user

    render(json: { user: @user }, status: :ok)
  end

  def user_params
    params.permit(:name, :email, :password)
  end
end
