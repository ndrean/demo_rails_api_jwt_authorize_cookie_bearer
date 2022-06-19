# Authenticate a Rails API backend with JWT, with Authorization-bearer or HttpOnly Cookie

A (very simple) Rails API with a (very simple) front-end  - powered by Parcel here - to interact with it. Two gems are used, **jwt** and **bcrypt**.
Bcrypt is used for the password with `has_secure_password` on the model that filters any output and saves a crypted password in the database. It also gives the `user.authenticate(password)` method.
The "jwt" produces JwtTokens from a secret salt (used Rails.secret_key here). It gives gives 2 methods JWT.encode and JWT.decode with specific errors.

Run in 2 terminals:

```bash
rails s
parcel index.html
```

Two versions: "main" with a cookie, "jwt-authenticate" with bearer.

- "main" with HttpOnly cookie. Needs the header `credentials: 'include'` front-side,  and for the back-end, we need "cors" with "credentials: true" in the CORS intializer back-end and the midlleware "  include ActionController::Cookies". Except singup and login, every request includes the cookie that the back-end reads and decodes. The jwt gem returns the decoded token or "error" (expired of invalid).

- "jwt-authenticate with Authorization. The token is saved in **localStorage**. We only need to pass a header "Authorization: bearer -jwt_token-" on each request for authentication (except the signup and login). The jwt decodes or returns an error (expired or invalid).

[The source](https://www.thegreatcodeadventure.com/jwt-storage-in-rails-the-right-way/)

[Csrf](https://blog.eq8.eu/article/rails-api-authentication-with-spa-csrf-tokens.html)

[Source](https://learn.co/lessons/jwt-auth-rails)
