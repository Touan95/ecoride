# EcoRide 🚗🌿

**EcoRide** is an eco-friendly carpooling platform connecting drivers and passengers to promote sustainable and affordable travel.  
The project is built with a strong focus on performance, security, accessibility, and clean code practices.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React, TailwindCSS, Shadcn UI)
- **Backend:** [Node.js](https://nodejs.org/) (Express, TypeORM, PostgreSQL)
- **Databases:**
  - PostgreSQL (Supabase) for main data
  - MongoDB Atlas for reviews
- **Hosting:**
  - Backend: Heroku
  - Frontend: Vercel
- **Development Environment:** Docker (local only)

## 📦 Monorepo Structure

```
ecoride/
├── backend/ # Node.js API (Express + TypeORM)
├── frontend/ # Next.js frontend application
├── README.md # Monorepo documentation (you are here)
├── pnpm-workspace.yaml # pnpm workspace configuration
```

This project uses [pnpm workspaces](https://pnpm.io/workspaces) for monorepo management.

## 🚀 Getting Started for local development

1. Copy the environment file :

```bash
cp .env.example .env.local                      # Root env file
cd frontend && cp .env.example .env.local       # Frontend env file
```

2. Start docker then run :

```bash
pnpm docker:start           # Start containers
pnpm start:database         # Start database (should be started before starting backend)
pnpm dev:be                 # Start backend
pnpm migration:run          # Run database migration
pnpm dev:fe                 # Start frontend
```

- Frontend available at http://localhost:3000/
- Backend API available at http://localhost:8080/api

## 🌱 About

EcoRide was developed as part of a professional web and mobile development certification project.
It aims to demonstrate clean architecture, real-world project management, eco-responsible design, and technical knowledge.
