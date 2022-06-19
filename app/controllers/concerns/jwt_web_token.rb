# frozen_string_literal: true

# methods for JWTokens
module JwtWebToken
  extend ActiveSupport::Concern

  SECRET = Rails.application.secret_key_base
  LIFE_TIME = 1.minute

  def encode(payload, exp = LIFE_TIME.from_now.to_i)
    payload[:exp] = exp
    JWT.encode(payload, SECRET)
  end

  def decode(token)
    JWT.decode(token, SECRET)[0]
  rescue JWT::DecodeError => e
    render(json: { error: e }, status: 401)
  end
end
