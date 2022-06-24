# frozen_string_literal: true

# defines the login/logout/signup methods
class AuthorizationController < ApplicationController
  include JwtWebToken
  skip_before_action :authorize_request

  def logout
    render(json: { message: 'succesfully logged out' }, status: :ok)
  end

  # use Bcrypt "authenticate" method
  def login
    user = User.find_by_email(params[:email])
    checked = user&.authenticate(params[:password])
    return render(json: { error: 'Not found' }, status: 404) unless checked

    # iss: issuer, aud: audience, perm: permissions, sub: subject
    jwt = encode({
                   jti: Digest::MD5.hexdigest('unforgetable'), id: user.id, email: user.email,
                   iat: DateTime.now.to_i, iss: 'rails',
                   aud: 'index.html', role: %w[user admin]
                 })
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
