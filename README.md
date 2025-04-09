# EcoRide 🚗🌿

EcoRide is a carpooling platform that promotes eco-friendly travel by connecting drivers and passengers.

## **Tech Stack**

- **Frontend:** Next.js (React)
- **Backend:** Node.js (Express, TypeORM, PostgreSQL)
- **Database:** Supabase (PostgreSQL)
- **Hosting:**
  - **Backend:** Render
  - **Frontend:** Vercel

## **Monorepo**

ecoride/
│── backend/
│── frontoffice/
│── README.md
│── pnpm-workspace.yaml

## **Setup**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Start docker then run :

```bash
pnpm docker:start           # Start containers
pnpm start:database         # Start database (should be started before starting backend)
pnpm migration:run          # Run database migration
pnpm dev:be                 # Start backend
pnpm dev:fo                 # Start frontoffice
```
