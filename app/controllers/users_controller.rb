# frozen_string_literal: true

# user controller actions are protected by authnetification except the creation!
class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: :create

  include JwtWebToken

  def index
    users = User.all
    render(json: { users: }, status: :ok)
  end

  def create
    User.create!(user_params)
  end

  def current
    # the authenticate_request returns an instance variable
    render(json: { user: @current_user['email'] }, status: :ok)
  end

  def show
    user = User.find_by_id(params[:id])
    render(json: { error: 'not found' }, status: 404) unless user

    render(json: { user: }, status: :ok)
  end

  def user_params
    params.permit(:name, :email, :password)
  end
end
