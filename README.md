# backend-notes-api

Secure personal notes REST API with JWT authentication, HttpOnly cookies, MongoDB persistence, and strict user ownership.

## Features

- User registration, login, and logout
- JWT authentication stored in an HttpOnly cookie
- Create, list, read, update, and delete notes
- Every note is scoped to its owner
- Input validation and safe error responses
- Helmet security headers and rate limiting
- Configurable CORS with credentials
- Standard API response URLs and request logs
- Automated in-process API tests

## Requirements

- Node.js 18 or newer
- MongoDB running locally or a hosted MongoDB connection

## Setup

```bash
npm install
copy .env.example .env
```

Set a real MongoDB URI and a random `JWT_SECRET` with at least 32 characters in `.env`.

## Run

```bash
npm run dev
```

The default port is `1198`.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Server port, defaults to `1198` |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Random secret, minimum 32 characters |
| `NODE_ENV` | No | Use `production` to enable Secure cookies |
| `CLIENT_ORIGINS` | No | Comma-separated trusted frontend origins |
| `COOKIE_SAME_SITE` | No | Cookie policy, defaults to `lax` |

## API endpoints

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/` | Public | API status |
| GET | `/health` | Public | Health response |
| POST | `/api/auth/register` | Public | Register a user and set cookie |
| POST | `/api/auth/login` | Public | Login and set cookie |
| POST | `/api/auth/logout` | Public | Clear auth cookie |
| POST | `/api/notes` | Authenticated | Create a note |
| GET | `/api/notes` | Authenticated | List the current user's notes |
| GET | `/api/notes/:id` | Authenticated | Read an owned note |
| PUT | `/api/notes/:id` | Authenticated | Update an owned note |
| DELETE | `/api/notes/:id` | Authenticated | Delete an owned note |

All JSON responses include `apiUrl` as the first field. Browser clients must use `credentials: "include"` for cookie-based requests.

Detailed flow and security notes are available in [Documentation.md](./Documentation.md). Request examples are available in [rest.http](./rest.http).

## License

MIT. See [LICENSE](./LICENSE).

## Author

**Ashish Ranjan**

Full-Stack Web Developer

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/a2rp](https://buymeacoffee.com/a2rp)
- Patreon: [https://www.patreon.com/a2rp](https://www.patreon.com/a2rp)
