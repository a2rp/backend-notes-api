# Notes API Documentation

## Overview

This API provides authenticated personal notes CRUD operations. Users can only read or change notes that belong to their own account.

## Authentication flow

1. Register or log in with a valid email and password of at least eight characters.
2. The API hashes the password and sets a seven-day JWT in the `token` HttpOnly cookie.
3. Send that cookie with `credentials: "include"` for note requests.
4. Middleware verifies the token and loads the user without the password field.
5. Logout clears the cookie with matching security attributes.

## Endpoints

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/` | None | API status |
| GET | `/health` | None | Health response |
| POST | `/api/auth/register` | None | Create a user and authenticate |
| POST | `/api/auth/login` | None | Authenticate a user |
| POST | `/api/auth/logout` | None | Clear auth cookie |
| POST | `/api/notes` | Cookie | Create an owned note |
| GET | `/api/notes` | Cookie | List owned notes |
| GET | `/api/notes/:id` | Cookie | Read an owned note |
| PUT | `/api/notes/:id` | Cookie | Update an owned note |
| DELETE | `/api/notes/:id` | Cookie | Delete an owned note |

Every JSON response includes `apiUrl` first. Every request is logged as `[API] METHOD path -> status`.

## Validation and security

- Passwords are hashed with bcrypt before persistence.
- Email format, name length, title length, and content length are validated.
- JWTs are stored in an HttpOnly cookie and are never returned in JSON.
- Production cookies use `Secure` when `NODE_ENV=production`.
- CORS accepts only origins listed in `CLIENT_ORIGINS`.
- Helmet adds baseline security headers.
- Authentication and notes routes have rate limits.
- Request bodies are limited to 20 KB.
- Note queries always include the authenticated user's ID.
- Invalid note IDs return a not found response without database errors.
- Internal error details are logged server-side and hidden from clients.

## Local setup

```bash
npm install
copy .env.example .env
npm run dev
```

The default port is `1198`.

## Frontend example

```js
await fetch("http://localhost:1198/api/notes", {
    credentials: "include",
});
```

## License

MIT. See [LICENSE](./LICENSE).
