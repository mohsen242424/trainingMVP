# Afuq (أفق) - Internship Simulation Platform (trainingMVP)

A professional internship simulation web platform for university students.

## Features
- **Student Workspace**: Apply to positions, receive real tasks, submit work, get instant AI evaluation.
- **Supervisor Dashboard**: Review applications, evaluate submissions, track interns, schedule meetings.
- **Admin Panel**: Manage users, positions, and platform analytics.
- **AI Integration**: Evaluation powered by Anthropic Claude.
- **Realtime Chat & Notifications**: Built with Socket.io.
- **RTL Arabic First Design**: Built with TailwindCSS and custom styling.

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, Lucide Icons, React Router
- **Backend**: Node.js, Express.js, SQLite (better-sqlite3), Socket.io, Multer, JWT

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

2. **Setup environment variables**:
   Create a `.env` in the root:
   ```env
   JWT_SECRET=afuq_jwt_secret_2024_production
   ANTHROPIC_API_KEY=your_key_here
   PORT=3001
   ```

3. **Start the platform**:
   ```bash
   npm run dev
   ```
   - Client runs on `http://localhost:5173`
   - Server runs on `http://localhost:3001`
