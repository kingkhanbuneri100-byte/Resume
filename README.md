# Aziz Ullah Khan — Interactive Resume & Portfolio (Fullstack)

This repository was recreated as a fullstack project with a React (Vite) frontend and a Node.js + Express backend.

Folders
- client — Vite + React frontend (development at http://localhost:5173)
- server — Express backend API (runs at http://localhost:4000)

Getting started (development)

1. Clone the repo and switch to the branch:

   git clone https://github.com/kingkhanbuneri100-byte/Resume.git
   cd Resume
   git checkout recreate/fullstack

2. Install dependencies for client and server:

   # from repo root
   npm install
   cd client
   npm install
   cd ../server
   npm install

3. Start both in development (you can run two terminals):

   # In one terminal (server)
   cd server
   npm run dev

   # In another terminal (client)
   cd client
   npm run dev

By default:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

API endpoints
- GET /api/cv — returns the CV JSON
- POST /api/contact — accepts JSON body { name, email, message } and appends to server/data/contacts.json

Build & serve production
1. Build client: cd client && npm run build
2. Serve from server: the Express app will serve static files from client/dist when available
3. Start server: cd server && npm start

Notes
- Placeholder logo is included at client/public/AT-Logo.svg. Replace it with your real image if available.
