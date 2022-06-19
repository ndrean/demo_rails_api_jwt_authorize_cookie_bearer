# frozen_string_literal: true

# authentication before any other controler action
class ApplicationController < ActionController::API
  include ActionController::Cookies
  include JwtWebToken

  before_action :authenticate_request

  private

  def authenticate_request
    jwt = cookies.signed[:jwt]
    token = decode(jwt)
    render(json: { error: 'Unauthorized' }, status: 401) unless token
  end
end
