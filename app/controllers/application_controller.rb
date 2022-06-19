# frozen_string_literal: true

# authentication before any other controler action
class ApplicationController < ActionController::API
  include JwtWebToken
  # after_action :set_csrf_cookie
  before_action :authenticate_request

  private

  def authenticate_request
    bearer = request.headers['Authorization']
    return render(json: { error: 'Unauthorized' }, status: 401) unless bearer

    jwt_token = bearer.split(' ').last
    @current_user = decode(jwt_token)
  end

  # def set_csrf_cookie
  #   cookies["CSRF-TOKEN"] = {
  #     value: form_authenticity_token,
  #     secure: true,
  #     same_site: :strict
  #     domain: 'localhost'
  #   }
  # end
end
