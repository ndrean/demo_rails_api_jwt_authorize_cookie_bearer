# Authenticate a Rails API backend with JWT, with Authorization-bearer or HttpOnly Cookie

A (very simple) Rails API with a (very simple) front-end powered by Parcel here to interact with it (or Postman).
Two gems are used: **jwt** and **bcrypt**.
Bcrypt is used for the password with `has_secure_password` on the model that filters any output and saves a crypted password in the database. It also gives the `user.authenticate(password)` method.
The "jwt" produces JwtTokens from a secret salt (used Rails.secret_key here). It gives gives 2 methods `JWT.encode` and `JWT.decode` adn renders **specific errors**.

## Two branches, cookie and bearer

Two versions: "main" with a cookie, "jwt-authenticate" with bearer.

- "main" with HttpOnly cookie. Needs the header `credentials: 'include'` front-side,  and for the back-end, we need "cors" with "credentials: true" in the CORS intializer back-end and the midlleware "  include ActionController::Cookies". Except signup and login, every request includes the cookie that the back-end reads and decodes. The jwt gem returns the decoded token or "error" (expired of invalid). The session is not saved to the database.

- "jwt-authenticate" with Authorization. The token is saved in **localStorage**. We only need to pass a header "Authorization: bearer -jwt_token-" on each request for authentication (except the signup and login). The jwt decodes or returns an error (expired or invalid).

## Run

Run in 2 terminals:

```bash
rails s
parcel index.html
```

> !! RAILS does **not want headers: { "Content-type": "application/json"}** when **formdata** !!

## Sources

[For cookie](https://www.thegreatcodeadventure.com/jwt-storage-in-rails-the-right-way/)

[Note on Csrf](https://blog.eq8.eu/article/rails-api-authentication-with-spa-csrf-tokens.html)

[Source](https://learn.co/lessons/jwt-auth-rails)

[Notes on session in Rails](https://orbit.love/blog/managing-server-side-sessions-in-rails)

## Eslint and [Prettier](https://prettier.io/docs/en/options.html)

```bash
npm init @eslint/config
npx eslint app.js
```

Add the following to avoid warnings: [Eslint](https://eslint.org/docs/rules/no-console)

```js
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
```

## About [CORS](https://jakearchibald.com/2021/cors/)

## About [Formdata](https://jakearchibald.com/2021/encoding-data-for-post-requests/)

## About [import-exports](https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default/)
