# backend-notes-api

Backend API for personal notes CRUD with user ownership using JWT and HttpOnly cookies.

## Features

- Register user
- Login user
- Logout user
- Create note
- Get all notes (user-specific)
- Get single note (user-specific)
- Update note (user-specific)
- Delete note (user-specific)
- Protected routes
- JWT authentication
- HttpOnly cookie based auth
- MongoDB with Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser

## Environment Variables

Create a .env file:

```bash
PORT=1202
MONGO_URI=mongodb://127.0.0.1:27017/backend_notes_api
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### Notes

- POST /api/notes
- GET /api/notes
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id

### Notes

- Each note belongs to a specific user
- Users can only access their own notes
- Authentication via HttpOnly cookies
- Use withCredentials: true in frontend

## Follow Me

- GitHub: https://github.com/a2rp
- Portfolio: https://www.ashishranjan.net
- LinkedIn: https://www.linkedin.com/in/aashishranjan
- Facebook: https://www.facebook.com/theash.ashish/
- YouTube: https://www.youtube.com/@ashishranjan-ashz
