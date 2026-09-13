# Nihon Job Finder

Full-stack job platform for foreigners looking for work in Japan.

This project was built as a portfolio case study to demonstrate a real frontend + backend flow: authentication, database access, API endpoints, role-based product thinking and admin moderation.

## Main Features

- Real login with Supabase Auth.
- PostgreSQL database hosted in Supabase.
- Custom REST API with Node.js, Express and TypeScript.
- Job listings loaded from `/api/jobs`.
- Role model prepared for `candidate`, `company` and `admin`.
- Company workflow for creating job posts.
- Admin workflow for approving or rejecting job posts.
- Candidate workflow for applications and favorites.
- Responsive UI for desktop and mobile.

## Tech Stack

- React
- TypeScript
- Node.js
- Express
- Supabase Auth
- Supabase PostgreSQL
- REST API
- HTML/CSS

## Project Structure

```txt
nihon-job-finder/
  client/              React + TypeScript frontend
  server/              Node/Express API
  database/schema.sql  Supabase PostgreSQL schema
  index.html           Static portfolio preview
  style.css            Static preview styles
```

## Local Setup

Create a `.env` file in the `nihon-job-finder` folder using `.env.example` as a guide.

Never commit `.env` files to GitHub.

Install and run the API:

```powershell
cd server
npm.cmd install
npm.cmd run dev
```

Install and run the frontend:

```powershell
cd client
npm.cmd install
npm.cmd run dev
```

Local URLs:

```txt
API health: http://localhost:4000/api/health
Jobs API:   http://localhost:4000/api/jobs
Frontend:   http://localhost:5173/
```

## Portfolio Summary

Nihon Job Finder is a full-stack job platform for foreigners in Japan. It uses React, TypeScript, Node.js, Express and Supabase to provide real authentication, PostgreSQL-backed job listings, API-driven data and role-based workflows for candidates, companies and admins.

## Security Note

This repository must not include real Supabase keys. Use `.env.example` for documentation and configure real values only in local development or hosting environment variables.
