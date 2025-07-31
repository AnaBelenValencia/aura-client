# Aura Frontend

This is the frontend for the **Aura Users Management App**, built with **React**, **Vite**, **TypeScript**, and **TailwindCSS**.  
It consumes a RESTful API and provides a clean interface for user authentication, profile management, and user listing.

---

## Features

- Login & Register with form validation
- Fully responsive UI styled with TailwindCSS
- Dashboard with:
  - View logged user profile
  - Edit profile
  - View all users
- Error and loading states for better UX
- State management using React hooks

---

## Project Structure

src/
├── api/ // API calls
├── components/ // Reusable UI components
├── lib/ // Schemas and utils
├── pages/ // Route components
├── router/ // App routing
└── main.tsx // App entry point


---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment
VITE_API_URL=http://localhost:3000/api

### 2. Run the development server

```bash
npm run dev
```

### Requirements
Node.js v18+
Backend server running (see Aura Backend Repo)

### Tech Stack

- React
- Vite
- TypeScript
- TailwindCSS
- React Hook Form
- Zod
- Lucide Icons

### API Endpoints Used
| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/login`    | Login user            |
| POST   | `/auth/register` | Register new user     |
| GET    | `/users/profile` | Get current user data |
| PUT    | `/users/profile` | Update user profile   |
| GET    | `/users`         | List all users        |
| PUT    | `/users/:id`     | Update any user       |
