
# Smart University Assistance Platform

A lightweight platform for managing university notices, complaints, feedback, and account management. This repository contains a Node.js/Express backend and a Vite + React frontend.

## Repository Structure

- `backend/` — Express server, API routes, middleware, and services.
- `frontend/` — React (Vite) single-page app.
- `database/` — SQL schema and seed files.

## Features

- User authentication and account management
- Create, view, and manage notices
- Create and track complaints
- Feedback submission
- Department search and management

## Prerequisites

- Node.js (>= 18 recommended)
- npm or yarn
- MySQL (or compatible) for the provided SQL schema

## Backend Setup

1. Change to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the environment variables your app expects (see `backend/config/db.js` for DB connection hints). Typical variables:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=smart_university
JWT_SECRET=your_jwt_secret
```

4. Initialize the database using the SQL files in `database/` (use your preferred MySQL client):

```sql
-- from project root or import via client
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

5. Start the backend (development):

```bash
npm run dev
```

## Frontend Setup

1. Change to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend expects the backend API to be available at the configured base URL (see `frontend/api/axios.js`). Update the base URL there or via env variables as needed.

## Scripts

- Backend: defined in `backend/package.json` (e.g., `start`, `dev`).
- Frontend: defined in `frontend/package.json` (e.g., `dev`, `build`, `preview`).

## Useful Files

- Backend entry: `backend/index.js`
- DB config: `backend/config/db.js`
- Frontend entry: `frontend/src/main.jsx`
- DB schema & seeds: `database/schema.sql`, `database/seed.sql`

## Contributing

1. Fork the repo
2. Create a feature branch
3. Raise a pull request with a clear description and tests where appropriate

## License

This project does not include a license file. Add `LICENSE` if you wish to choose a license.

---
