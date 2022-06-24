# frozen_string_literal: true

# authorization before any other controler action
class ApplicationController < ActionController::API
  include JwtWebToken
  # after_action :set_csrf_cookie
  before_action :authorize_request

  private

  def authorize_request
    bearer = request.headers['Authorization']
    return render(json: { error: 'Unauthorized' }, status: 401) unless bearer

    jwt_token = bearer.split(' ').last
    # decode is rescued with error if expired
    jwt = decode(jwt_token)

    @current_user = { email: jwt['email'], iat: jwt['iat'], exp: jwt['exp'] }
  end
end

# def set_csrf_cookie
#   cookies["CSRF-TOKEN"] = {
#     value: form_authenticity_token,
#     secure: true,
#     same_site: :strict
#     domain: 'localhost'
#   }
# end
