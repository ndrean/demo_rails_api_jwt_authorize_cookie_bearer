# frozen_string_literal: true

# defines the login/logout/signup methods
class AuthenticationController < ApplicationController
  include JwtWebToken
  skip_before_action :authenticate_request

  def logout
    render(json: { message: 'succesfully logged out' }, status: :ok)
  end

  def login
    user = User.find_by_email(params[:email])
    checked = user&.authenticate(params[:password])
    return render(json: { error: 'Not found' }, status: 404) unless checked

    jwt = encode({ id: user.id, email: user.email })
    render(json: { message: 'Welcome back!', user: user.email, jwt: }, status: :ok)
  end

  def signup
    user_params = params.permit(:email, :name, :password)
    user = User.create!(user_params)
    jwt = encode({ id: user.id, email: user.email })
    render(json: { message: 'Welcome', user: user.email, jwt: }, status: :ok)
  rescue ActiveRecord::RecordInvalid => e
    render(json: { error: e.record.errors }, status: 422)
  end
end
